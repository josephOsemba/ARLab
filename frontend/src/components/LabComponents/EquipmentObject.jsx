import { useRef } from 'react';
import { useDrag } from '@use-gesture/react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const EquipmentObject = ({ object, isSelected, onClick, onDrag }) => {
  const meshRef = useRef();
  const { camera, size } = useThree();

  // Get the appropriate 3D model based on object type
  const getModel = () => {
    switch (object.type) {
      case 'resistor':
        return (
          <mesh>
            <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
            <meshStandardMaterial color="brown" />
          </mesh>
        );
      case 'battery':
        return (
          <mesh>
            <boxGeometry args={[0.5, 1, 0.5]} />
            <meshStandardMaterial color="green" />
          </mesh>
        );
      // Add more equipment types here
      default:
        return (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="gray" />
          </mesh>
        );
    }
  };

  // Handle drag events
  const bind = useDrag(
    ({ event, offset: [x, y] }) => {
      event.stopPropagation();
      const [, , z] = meshRef.current.position;

      // Convert screen coordinates to world coordinates
      const worldPos = new THREE.Vector3(
        (x / size.width) * 2 - 1,
        -(y / size.height) * 2 + 1,
        0.5
      ).unproject(camera);

      onDrag(object.id, [worldPos.x, worldPos.y, z]);
    },
    { pointerEvents: true }
  );

  return (
    <group
      ref={meshRef}
      position={object.position}
      rotation={object.rotation}
      scale={object.scale}
      onClick={(e) => {
        e.stopPropagation();
        onClick(object);
      }}
      {...bind()}
    >
      {getModel()}
      {isSelected && (
        <mesh>
          <boxGeometry args={[1.1, 1.1, 1.1]} />
          <meshStandardMaterial
            color="yellow"
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>
      )}
    </group>
  );
};

export default EquipmentObject;
