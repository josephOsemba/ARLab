import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import EquipmentObject from './EquipmentObject';

const CameraController = ({ viewMode }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (viewMode === 'top') {
      camera.position.set(0, 10, 0);
    } else if (viewMode === 'front') {
      camera.position.set(0, 0, 10);
    } else if (viewMode === 'side') {
      camera.position.set(10, 0, 0);
    } else {
      camera.position.set(5, 5, 5);
    }
    camera.lookAt(0, 0, 0);
  }, [viewMode, camera]);

  return null;
};

const ExperimentView = ({
  sceneObjects,
  selectedObject,
  onObjectSelect,
  onObjectUpdate,
  viewMode,
}) => {
  const controlsRef = useRef();

  const handleObjectClick = (object) => {
    onObjectSelect(object);
  };

  const handleObjectDrag = (id, newPosition) => {
    onObjectUpdate(id, { position: newPosition });
  };

  return (
    <Canvas shadows>
      <CameraController viewMode={viewMode} />

      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />

      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
      />

      <Grid infiniteGrid fadeDistance={50} fadeStrength={5} />
      <Environment preset="city" />

      {sceneObjects.map((obj) => (
        <EquipmentObject
          key={obj.id}
          object={obj}
          isSelected={selectedObject?.id === obj.id}
          onClick={handleObjectClick}
          onDrag={handleObjectDrag}
        />
      ))}
    </Canvas>
  );
};

export default ExperimentView;
