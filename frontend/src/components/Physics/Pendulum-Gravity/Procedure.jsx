import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OscillationTable from './oscillations/OscillationTable';
import OscillationFormModal from './oscillations/OscillationFormModal';
import OscillationChart from './oscillations/OscillationChart';
import ExportButtons from './oscillations/ExportButtons';
import '../../../styles/Theory.css';

const Procedure = () => {
  onst[(oscillations, setOscillations)] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
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

    return () => newSocket.close();
  }, []);

  const updateRecord = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/oscillations/${id}`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Update failed:', error);
      throw error;
    }
  };

  const deleteRecord = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/oscillations/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete record');
    }
  };
  return (
    <div className="theory-section">
      <div className="content-wrapper">
        <div className="text-content">
          <h2 style={{ textAlign: 'center' }}>Procedure of Pendulum Gravity</h2>

          <h3>Procedure</h3>
          <p>The measurement of the acceleration due to gravity:</p>
          <p>
            A simple pendulum may be used to measure the acceleration due to
            gravity (g). The period is measured for a series of different values
            of <strong>l</strong>, and a graph is plotted of <strong>l</strong>{' '}
            against <strong>T²</strong>.
          </p>
          <p>
            The gradient of this graph is <strong>l/T²</strong> and this is
            equal to <strong>g/4π²</strong>. Therefore,{' '}
            <strong>g = 4π²l / T²</strong>.
          </p>
          <p>
            From this, the value of <strong>g</strong> can be found. Very
            accurate determinations by this method have been used in geophysical
            prospecting.
          </p>

          <h4>Steps:</h4>
          <ol>
            <li>
              With the arrangement as shown in Figure 1, make{' '}
              <strong>l = 20cm</strong> and displace the pendulum bob slightly
              from the equilibrium position to some position A.
            </li>
            <li>
              Release the bob and record the time taken for 20 oscillations,{' '}
              <strong>t20</strong>.
            </li>
            <li>
              From this time, determine and record the time period{' '}
              <strong>T</strong>. Now increase the length, <strong>l</strong>,
              of the string in steps of 20cm and repeat the experiment for 5
              different lengths. Draw a graph of <strong>l</strong> against{' '}
              <strong>T²</strong>.
            </li>
            <li>Calculate the slope of the graph.</li>
            <li>
              From your graph, calculate the acceleration due to gravity{' '}
              <strong>g</strong> and the error associated with this value.
              Compare your result with the standard value.
            </li>
            <li>
              Set the length of the pendulum to about 100cm and measure the time
              taken for 30 complete oscillations for amplitudes,{' '}
              <strong>θ</strong>, ranging from 10° to 70° in steps of 10°. Hence
              determine the periods <strong>T1</strong>.
            </li>
            <li>
              Plot a graph of <strong>T1</strong> against amplitude{' '}
              <strong>θ</strong>, and comment on your results.
            </li>
          </ol>

          <h4>Procedure Diagram</h4>
          <div className="image-preview-container">
            <img
              src="/assets/GRAVITY-THEORY.png"
              alt="Procedure Visual"
              className="procedure-image"
              style={{ width: '70%', height: '500px' }}
            />
          </div>

          <h4 style={{ marginTop: '40px' }}>Table 1</h4>

          <div className="oscillations-page">
            <h2>Pendulum Oscillation Experiment</h2>

            <ExportButtons data={oscillations} />
            <OscillationTable
              data={oscillations}
              onUpdate={updateRecord}
              onDelete={deleteRecord}
            />
            <OscillationChart data={oscillations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Procedure;
