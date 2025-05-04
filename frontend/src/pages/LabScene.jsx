import { useState, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
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

  // Add drop target functionality
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'APPLIANCE',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && sceneRef.current) {
        const rect = sceneRef.current.getBoundingClientRect();
        const x = offset.x - rect.left;
        const y = offset.y - rect.top;

        // Convert screen coordinates to 3D scene coordinates
        // This is a simplified example - you'll need to adjust based on your 3D library
        const position = [
          (x / rect.width) * 10 - 5, // X coordinate (-5 to 5 range)
          0, // Y coordinate (ground level)
          -(y / rect.height) * 10 + 5, // Z coordinate (-5 to 5 range)
        ];

        handleObjectAdd(item.name, item.modelUrl, position);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

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

  const handleObjectAdd = (objectType, modelUrl, position = [0, 0, 0]) => {
    const newObject = {
      id: `${objectType}-${Date.now()}`,
      type: objectType,
      modelUrl,
      position,
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
          ref={drop}
          className="scene-viewport"
          style={{
            flex: 1,
            position: 'relative',
            backgroundColor: isOver ? '#3a3a3a' : '#2a2a2a',
            overflow: 'hidden',
            transition: 'background-color 0.3s ease',
          }}
        >
          <div ref={sceneRef} style={{ width: '100%', height: '100%' }}>
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
