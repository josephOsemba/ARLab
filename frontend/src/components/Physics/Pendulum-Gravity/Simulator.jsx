import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
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

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTimeout(() => setShowOptions(false), 300);
    setShowOptions(false);

    if (option === '3d-lab') {
      navigate('/3d-lab'); // Adjust this path to your main 3D lab route
    }
  };

  // Fetch initial data
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
      return response.data;
    } catch (err) {
      console.error('Update error:', err);
      throw err;
    }
  };

  const deleteRecord = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/oscillations/${id}`);
    } catch (err) {
      console.error('Delete error:', err);
      alert('Delete failed');
    }
  };

  const addRecord = async (newData) => {
    try {
      const tempId = Date.now(); // Temporary unique ID
      const tempData = { ...newData, id: tempId, temp: true }; // Add temp flag
      setOscillations((prev) => [...prev, tempData]);
      await axios.post('http://localhost:5000/api/oscillations', newData);
    } catch (err) {
      console.error('Create error:', err);
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
    return null; // The navigation will handle this
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
