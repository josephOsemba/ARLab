import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OscillationTable from './oscillations/OscillationTable';
import OscillationFormModal from './oscillations/OscillationFormModal';
import OscillationChart from './oscillations/OscillationChart';
import ExportButtons from './oscillations/ExportButtons';
import '../../../styles/Theory.css';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const Simulator = () => {
  const [showOptions, setShowOptions] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [oscillations, setOscillations] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableRef = useRef();
  const chartRef = useRef();
  const navigate = useNavigate();

  // Handle 3D lab option redirection
  if (selectedOption === '3d-lab') {
    return <Navigate to="../../../pages/Lab/3DLab.jsx" replace />;
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTimeout(() => setShowOptions(false), 300);
    setShowOptions(false);
    if (option === '3d-lab') {
      navigate('/3d-lab');
    }
  };

  useEffect(() => {
    if (selectedOption !== 'existing') return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/oscillations'
        );
        setOscillations(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
        toast.error('Failed to load data', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedOption]);

  // WebSocket setup for real-time updates
  useEffect(() => {
    if (selectedOption !== 'existing') return;

    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('update_oscillation', (updatedRecord) => {
      setOscillations((prev) =>
        prev.map((r) => (r.id === updatedRecord.id ? updatedRecord : r))
      );
    });

    newSocket.on('delete_oscillation', ({ id }) => {
      setOscillations((prev) => prev.filter((r) => r.id !== id));
    });

    newSocket.on('new_oscillation', (newRecord) => {
      setOscillations((prev) => {
        const tempMatchIndex = prev.findIndex(
          (r) =>
            r.temp &&
            r.length === newRecord.length &&
            r.time === newRecord.time &&
            r.period === newRecord.period
        );

        if (tempMatchIndex !== -1) {
          const updated = [...prev];
          updated[tempMatchIndex] = newRecord;
          return updated;
        }

        return [...prev, newRecord];
      });
    });

    return () => {
      if (newSocket) newSocket.close();
    };
  }, [selectedOption]);

  const updateRecord = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/oscillations/${id}`,
        updatedData
      );
      toast.success('Record updated successfully', {
        position: 'bottom-right',
        autoClose: 3000,
      });
      return response.data;
    } catch (err) {
      console.error('Update error:', err);
      toast.error('Failed to update record', {
        position: 'bottom-right',
        autoClose: 3000,
      });
      throw err;
    }
  };

  const deleteRecord = async (id) => {
    try {
      // Show custom confirmation dialog
      const confirmDelete = await new Promise((resolve) => {
        toast.info(
          <div>
            <p>Are you sure you want to delete this record?</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '10px',
              }}
            >
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  toast.dismiss();
                  resolve(true);
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  toast.dismiss();
                  resolve(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>,
          {
            position: 'top-center',
            autoClose: false,
            closeButton: false,
            draggable: false,
            closeOnClick: false,
          }
        );
      });

      if (!confirmDelete) return;

      // Optimistic UI update - remove immediately
      setOscillations((prev) => prev.filter((r) => r.id !== id));

      // API call to delete
      await axios.delete(`http://localhost:5000/api/oscillations/${id}`);

      // Success notification
      toast.success('Record deleted successfully', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Delete error:', err);
      // Error notification
      toast.error('Failed to delete record', {
        position: 'bottom-right',
        autoClose: 3000,
      });
      // Revert by fetching fresh data
      const response = await axios.get(
        'http://localhost:5000/api/oscillations'
      );
      setOscillations(response.data);
    }
  };

  const addRecord = async (newData) => {
    try {
      const tempId = Date.now();
      const tempData = { ...newData, id: tempId, temp: true };
      setOscillations((prev) => [...prev, tempData]);
      await axios.post('http://localhost:5000/api/oscillations', newData);
      toast.success('Record added successfully', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    } catch (err) {
      console.error('Create error:', err);
      toast.error('Failed to add record', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    }
  };

  if (showOptions) {
    return (
      <div className="simulator-options">
        <h2>Choose a Simulator</h2>
        <div className="options-container">
          <div
            className="option-card"
            onClick={() => handleOptionSelect('existing')}
          >
            <h3>Basic Simulator</h3>
            <p style={{ color: 'purple' }}>
              Use the current pendulum oscillation experiment with data tables
              and charts
            </p>
          </div>
          <div
            className="option-card"
            onClick={() => handleOptionSelect('3d-lab')}
          >
            <h3>3D Lab</h3>
            <p style={{ color: 'purple' }}>
              Go to the main 3D laboratory environment with advanced
              visualization
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedOption === '3d-lab') {
    return null;
  }

  if (loading || error) {
    return (
      <div className="theory-section">
        <div className="content-wrapper">
          {loading && <div className="loading">Loading data...</div>}
          {error && <div className="error">Error: {error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="theory-section">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="content-wrapper">
        <div className="text-content">
          <div className="oscillations-page">
            <h2>Pendulum Oscillation Experiment</h2>

            <OscillationFormModal onSubmit={addRecord} />

            <ExportButtons
              tableRef={tableRef}
              chartRef={chartRef}
              data={oscillations}
            />

            <OscillationTable
              ref={tableRef}
              data={oscillations}
              onUpdate={updateRecord}
              onDelete={deleteRecord}
            />

            <OscillationChart ref={chartRef} data={oscillations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
