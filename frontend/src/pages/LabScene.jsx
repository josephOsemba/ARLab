import { useState, useEffect, useRef } from 'react';
import SceneSideBar from '../components/LabComponents/SceneSideBar';
import ExperimentControls from '../components/LabComponents/ExperimentControl';
import EquipmentPalette from '../components/LabComponents/EquipmentPalette';
import SceneToolbar from '../components/LabComponents/SceneToolbar';
import ExperimentView from '../components/LabComponents/ExperimentView';
import { fetchExperimentConfig } from '../../api/experiments';
import '../styles/LabScene.css';

const LabScene = ({ experimentId }) => {
  const [sceneObjects, setSceneObjects] = useState([]);
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState('perspective');
  const sceneRef = useRef();

  useEffect(() => {
    if (experimentId) {
      loadExperiment(experimentId);
    }
  }, [experimentId]);

  const loadExperiment = async (expId) => {
    try {
      const config = await fetchExperimentConfig(expId);
      setSelectedExperiment(config);
      setSceneObjects(config.defaultSceneConfig.objects || []);
    } catch (error) {
      console.error('Failed to load experiment:', error);
    }
  };

  const handleObjectAdd = (objectType, modelUrl) => {
    const newObject = {
      id: `${objectType}-${Date.now()}`,
      type: objectType,
      modelUrl, // Add the model URL from the backend
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      properties: {},
    };
    setSceneObjects([...sceneObjects, newObject]);
  };

  const handleObjectUpdate = (id, updates) => {
    setSceneObjects(
      sceneObjects.map((obj) => (obj.id === id ? { ...obj, ...updates } : obj))
    );
  };

  const handleObjectRemove = (id) => {
    setSceneObjects(sceneObjects.filter((obj) => obj.id !== id));
    if (selectedObject?.id === id) {
      setSelectedObject(null);
    }
  };

  const saveScene = (objects) => {
    console.log('Saving scene...', objects);
    localStorage.setItem('savedScene', JSON.stringify(objects));
  };

  return (
    <div
      className="lab-scene-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: '#1a1a1a',
      }}
    >
      <SceneToolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onSaveScene={() => saveScene(sceneObjects)}
        style={{
          height: '60px',
          backgroundColor: '#252525',
          borderBottom: '1px solid #333',
        }}
      />

      <div
        className="lab-scene-content"
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <SceneSideBar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          selectedExperiment={selectedExperiment}
          onExperimentChange={loadExperiment}
        />

        <div
          className="scene-viewport"
          style={{
            flex: 1,
            position: 'relative',
            backgroundColor: '#2a2a2a',
            overflow: 'hidden',
          }}
        >
          <ExperimentView
            sceneObjects={sceneObjects}
            selectedObject={selectedObject}
            onObjectSelect={setSelectedObject}
            onObjectUpdate={handleObjectUpdate}
            viewMode={viewMode}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>

        <EquipmentPalette
          equipmentList={selectedExperiment?.requiredEquipment || []}
          onAddObject={handleObjectAdd}
          style={{
            width: '250px',
            backgroundColor: '#252525',
            borderLeft: '1px solid #333',
            padding: '15px',
            overflowY: 'auto',
          }}
        />
      </div>

      {selectedObject && (
        <ExperimentControls
          object={selectedObject}
          onUpdate={handleObjectUpdate}
          onRemove={handleObjectRemove}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(37, 37, 37, 0.9)',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            zIndex: 100,
            width: '80%',
            maxWidth: '600px',
          }}
        />
      )}
    </div>
  );
};

export default LabScene;
