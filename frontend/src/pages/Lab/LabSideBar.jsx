import React from 'react';
import { useDrag } from 'react-dnd';

const LabAppliance = ({ name, icon, modelUrl, onAdd }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'MODEL',
    item: { name, modelUrl },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onAdd(item.name, item.modelUrl);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`lab-appliance ${isDragging ? 'dragging' : ''}`}>
      <div className="appliance-icon">{icon}</div>
      <div className="appliance-name">{name}</div>
    </div>
  );
};

const LabSidebar = ({ experiments, onAddObject, onBack }) => {
  return (
    <div className="lab-sidebar">
      <button onClick={onBack} className="back-button">
        ← Back to Simulator
      </button>

      <h3>Available Experiments</h3>
      <div className="experiment-list">
        {experiments?.map((exp) => (
          <div key={exp.id} className="experiment-item">
            {exp.name}
          </div>
        ))}
      </div>

      <h3>Lab Equipment</h3>
      <div className="equipment-list">
        <LabAppliance
          name="Pendulum Bob"
          icon="⏺️"
          modelUrl="/models/pendulum/bob.glb"
          onAdd={onAddObject}
        />
        <LabAppliance
          name="Pendulum Stand"
          icon="🪜"
          modelUrl="/models/pendulum/stand.glb"
          onAdd={onAddObject}
        />
        {/* Add more equipment as needed */}
      </div>
    </div>
  );
};

export default LabSidebar;
