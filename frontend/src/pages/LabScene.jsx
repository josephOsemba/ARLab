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

  const handleObjectAdd = (objectType) => {
    const newObject = {
      id: `${objectType}-${Date.now()}`,
      type: objectType,
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

  // Define the saveScene function
  const saveScene = (objects) => {
    // Example: Save the scene objects to localStorage
    console.log('Saving scene...', objects);
    localStorage.setItem('savedScene', JSON.stringify(objects));
  };

  return (
    <div className="lab-scene-container">
      <SceneToolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onSaveScene={() => saveScene(sceneObjects)} // Now calling the saveScene function
      />

      <div className="lab-scene-content">
        <SceneSideBar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          selectedExperiment={selectedExperiment}
          onExperimentChange={loadExperiment}
        />

        <div className="scene-viewport">
          <ExperimentView
            sceneObjects={sceneObjects}
            selectedObject={selectedObject}
            onObjectSelect={setSelectedObject}
            onObjectUpdate={handleObjectUpdate}
            viewMode={viewMode}
          />
        </div>

        <EquipmentPalette
          equipmentList={selectedExperiment?.requiredEquipment || []}
          onAddObject={handleObjectAdd}
        />
      </div>

      {selectedObject && (
        <ExperimentControls
          object={selectedObject}
          onUpdate={handleObjectUpdate}
          onRemove={handleObjectRemove}
        />
      )}
    </div>
  );
};

export default LabScene;
