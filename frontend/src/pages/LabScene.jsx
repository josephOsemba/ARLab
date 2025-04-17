import { useState } from 'react';
import PageTransition from '../components/PageTransition';
import OhmsLawExperiment from '../components/OhmsLawExperiment';
import SceneSideBar from '../components/SceneSideBar'; // Import the updated SideBar

const LabScene = () => {
  const [selectedExperiment, setSelectedExperiment] = useState('ohmsLaw'); // Default experiment
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle state

  return (
    <PageTransition>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* SideBar on the left */}
        <SceneSideBar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Main content on the right */}
        <div
          style={{
            marginLeft: isSidebarOpen ? '250px' : '0',
            flex: 1,
            padding: '20px',
            color: 'black',
            transition: 'margin-left 0.3s',
          }}
        >
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
        </div>
      </div>
    </PageTransition>
  );
};

export default LabScene;
