import React from 'react';
import { useDrag } from 'react-dnd'; // For drag-and-drop functionality

// Lab Appliance Component
const LabAppliance = ({ type, name, icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'APPLIANCE', // Unique type for drag-and-drop
    item: { type, name }, // Data to pass to the drop target
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: '10px',
        marginBottom: '10px',
        marginTop: '20px',
        backgroundColor: '#444',
        color: '#fff',
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
        border: '1px solid #666',
        borderRadius: '5px',
        textAlign: 'center',
      }}
    >
      {icon} {name}
    </div>
  );
};

const SceneSideBar = ({ isOpen }) => {
  return (
    <div
      style={{
        width: isOpen ? '250px' : '0',
        height: '85vh',
        backgroundColor: '#333',
        color: '#fff',
        padding: isOpen ? '20px' : '0',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000,
        overflowX: 'hidden',
        overflowY: 'auto',
        transition: 'width 0.3s, padding 0.3s',
        marginTop: '55px',
        borderRadius: '0 10px 10px 0',
      }}
    >
      {/* Sidebar Content */}
      {isOpen && (
        <>
          <h2>Lab Shelf</h2>
          <LabAppliance type="battery" name="Battery" icon="🔋" />
          <LabAppliance type="resistor" name="Resistor" icon="🟨" />
          <LabAppliance type="wire" name="Wire" icon="🔌" />
          <LabAppliance type="chemical" name="Chemical" icon="🧪" />
          <LabAppliance type="led" name="LED" icon="💡" />
        </>
      )}
    </div>
  );
};

export default SceneSideBar;
