import { useEffect, useState } from 'react';
import axios from '../api';
import PageTransition from '../components/PageTransition';
import OhmsLawExperiment from '../components/OhmsLawExperiment';
import SceneSideBar from '../components/SceneSideBar'; // Import the updated SideBar

const LabScene = () => {
  const [data, setData] = useState([]);
  const [selectedExperiment, setSelectedExperiment] = useState('ohmsLaw'); // Default experiment
  const [error, setError] = useState(null); // Track API errors
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/physics-data');
        setData(res.data);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch data. Ensure the backend is running.");
      }
    };

    fetchData();
  }, []);

  return (
    <PageTransition>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* SideBar on the left */}
        <SceneSideBar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Main content on the right */}
        <div style={{ marginLeft: isSidebarOpen ? '250px' : '0', flex: 1, padding: '20px', color: 'black', transition: "margin-left 0.3s" }}>
          <h1>Physics Lab</h1>

          {/* Experiment Selection Dropdown */}
          <label>Select Experiment: </label>
          <select
            onChange={(e) => setSelectedExperiment(e.target.value)}
            value={selectedExperiment}
            style={{
              color: 'black',
              background: 'white',
              padding: '5px',
              marginLeft: '10px',
              border: '1px solid black',
              borderRadius: '5px',
            }}
          >
            <option value="ohmsLaw">Ohm&apos;s Law</option>
            {/* Future experiments can be added here */}
          </select>

          {/* Render Selected Experiment */}
          <div style={{ marginTop: '20px' }}>
            {selectedExperiment === 'ohmsLaw' && <OhmsLawExperiment />}
          </div>

          {/* Error Handling */}
          {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

          {/* Displaying additional data from backend */}
          <div style={{ marginTop: '30px' }}>
            {data.length > 0 ? (
              data.map((item) => (
                <div key={item.id} style={{ marginBottom: '15px', borderBottom: '1px solid gray' }}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))
            ) : (
              !error && <p>Loading data...</p> // Show "Loading..." only if no error
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default LabScene;