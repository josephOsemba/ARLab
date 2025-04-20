import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';

// Draggable 3D Model
const LabAppliance = ({ name, file, icon, modelUrl }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'APPLIANCE',
    item: { name, modelUrl },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: '10px',
        marginBottom: '8px',
        backgroundColor: '#3a3a3a',
        color: '#fff',
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
        border: '1px solid #444',
        borderRadius: '6px',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
        fontSize: '14px',
      }}
      onMouseEnter={(e) => (e.target.style.transform = 'scale(1.02)')}
      onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
    >
      {icon && (
        <div style={{ fontSize: '20px', marginBottom: '5px' }}>{icon}</div>
      )}
      <div>{name}</div>
    </div>
  );
};

const ExperimentCategory = ({ title, experiments, titleColor }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div style={{ marginBottom: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 12px',
          backgroundColor: '#252525',
          borderRadius: '6px',
          cursor: 'pointer',
          marginBottom: '8px',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4
          style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: 500,
            color: titleColor,
          }}
        >
          {title}
        </h4>
        <span>{isExpanded ? '▼' : '▶'}</span>
      </div>

      {isExpanded && (
        <div style={{ paddingLeft: '10px' }}>
          {Object.entries(experiments).map(([experimentName, appliances]) => (
            <div key={experimentName} style={{ marginBottom: '15px' }}>
              <div
                style={{
                  padding: '6px 10px',
                  backgroundColor: '#333',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                {experimentName}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: '8px',
                }}
              >
                {appliances.map((appliance, idx) => (
                  <LabAppliance
                    key={idx}
                    name={appliance.name}
                    file={appliance.file}
                    icon={appliance.icon}
                    modelUrl={appliance.modelUrl}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SceneSideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [categories, setCategories] = useState({
    physics: {
      'Pendulum Gravity': [],
      'Projectile Motion': [
        { name: 'Launcher', file: 'launcher.glb', icon: '↗️' },
        { name: 'Projectile', file: 'ball.glb', icon: '⚽' },
        { name: 'Measuring Tape', file: 'tape.glb', icon: '📏' },
      ],
      "Newton's Second Law": [
        { name: 'Cart', file: 'cart.glb', icon: '🛒' },
        { name: 'Weights', file: 'weights.glb', icon: '⚖️' },
        { name: 'Pulley', file: 'pulley.glb', icon: '🌀' },
      ],
      'Inclined Plane': [
        { name: 'Plane', file: 'inclined_plane.glb', icon: '📐' },
        { name: 'Block', file: 'wooden_block.glb', icon: '🧱' },
        { name: 'Protractor', file: 'protractor.glb', icon: '📐' },
      ],
    },
    biology: {
      'Microscope Observation': [
        { name: 'Microscope', file: 'microscope.glb', icon: '🔬' },
        { name: 'Slide', file: 'slide.glb', icon: '🖲️' },
      ],
      'DNA Extraction': [
        { name: 'Test Tube', file: 'test_tube.glb', icon: '🧪' },
        { name: 'Centrifuge', file: 'centrifuge.glb', icon: '🌀' },
      ],
    },
    chemistry: {
      Titration: [
        { name: 'Burette', file: 'burette.glb', icon: '🧪' },
        { name: 'Flask', file: 'flask.glb', icon: '⚗️' },
      ],
      'Chemical Reactions': [
        { name: 'Beaker', file: 'beaker.glb', icon: '🥃' },
        { name: 'Bunsen Burner', file: 'burner.glb', icon: '🔥' },
      ],
    },
    engineering: {
      'Bridge Construction': [
        { name: 'Beams', file: 'beams.glb', icon: '⛓️' },
        { name: 'Joints', file: 'joints.glb', icon: '⚙️' },
      ],
      'Circuit Design': [
        { name: 'Breadboard', file: 'breadboard.glb', icon: '🔌' },
        { name: 'Resistors', file: 'resistors.glb', icon: '🔋' },
      ],
    },
    healthEducation: {
      'First Aid': [
        { name: 'Bandages', file: 'bandages.glb', icon: '🩹' },
        { name: 'Dummy', file: 'dummy.glb', icon: '🧍' },
      ],
      Nutrition: [
        { name: 'Food Models', file: 'food_models.glb', icon: '🍎' },
        { name: 'Scale', file: 'scale.glb', icon: '⚖️' },
      ],
    },
    homeScience: {
      'Textile Testing': [
        { name: 'Fabric Samples', file: 'fabrics.glb', icon: '🧵' },
        { name: 'Sewing Machine', file: 'sewing_machine.glb', icon: '🧶' },
      ],
      'Food Preservation': [
        { name: 'Jars', file: 'jars.glb', icon: '🍯' },
        { name: 'Vacuum Sealer', file: 'sealer.glb', icon: '📦' },
      ],
    },
  });

  useEffect(() => {
    const fetchPendulumModels = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/labscene/pendulum-models'
        );
        const models = await response.json();

        setCategories((prev) => ({
          ...prev,
          physics: {
            ...prev.physics,
            'Pendulum Gravity': [
              { name: 'Bob', icon: '⏺️', modelUrl: models.bob },
              { name: '2m String', icon: '🧵', modelUrl: models.string },
              { name: 'Stand', icon: '🪜', modelUrl: models.stand },
              { name: 'Protractor', icon: '📐', modelUrl: models.protractor },
              { name: 'Meter Rule', icon: '📏', modelUrl: models.meterRule },
              { name: 'Stopwatch', icon: '⏱️', modelUrl: models.stopwatch },
            ],
          },
        }));
      } catch (error) {
        console.error('Failed to fetch pendulum models:', error);
        // Fallback to placeholder items
        setCategories((prev) => ({
          ...prev,
          physics: {
            ...prev.physics,
            'Pendulum Gravity': [
              {
                name: 'Bob',
                icon: '⏺️',
                modelUrl: '/models/fallback/pendulum_bob.glb',
              },
              {
                name: '2m String',
                icon: '🧵',
                modelUrl: '/models/fallback/string.glb',
              },
              {
                name: 'Stand',
                icon: '🪜',
                modelUrl: '/models/fallback/stand.glb',
              },
              {
                name: 'Protractor',
                icon: '📐',
                modelUrl: '/models/fallback/protractor.glb',
              },
              {
                name: 'Meter Rule',
                icon: '📏',
                modelUrl: '/models/fallback/meter_rule.glb',
              },
              {
                name: 'Stopwatch',
                icon: '⏱️',
                modelUrl: '/models/fallback/stopwatch.glb',
              },
            ],
          },
        }));
      }
    };

    fetchPendulumModels();
  }, []);

  return (
    <div
      style={{
        width: isOpen ? '320px' : '50px',
        height: '85vh',
        backgroundColor: '#2d2d2d',
        color: '#fff',
        padding: isOpen ? '20px' : '10px 5px',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.2)',
        position: 'fixed',
        left: 0,
        top: '45px',
        zIndex: 1000,
        overflowX: 'hidden',
        overflowY: 'auto',
        transition: 'width 0.3s, padding 0.3s ease',
        marginTop: '55px',
        borderRadius: '0 10px 10px 0',
        fontFamily: '"Roboto", sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: isOpen ? 'space-between' : 'center',
          alignItems: 'center',
          marginBottom: isOpen ? '16px' : '0',
        }}
      >
        {isOpen && (
          <h4
            style={{
              fontSize: '18px',
              fontWeight: 600,
              margin: 0,
              color: '#fff',
            }}
          >
            Lab Shelf
          </h4>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            padding: '2px 6px',
            borderRadius: '4px',
            transition: 'background 0.2s',
            marginLeft: isOpen ? 0 : '-5px',
          }}
          title={isOpen ? 'Close Shelf' : 'Open Shelf'}
        >
          {isOpen ? '❌' : '▶'}
        </button>
      </div>

      {isOpen && (
        <div>
          <ExperimentCategory
            title="Physics"
            experiments={categories.physics}
            titleColor="#FFD700"
          />
          <ExperimentCategory
            title="Biology"
            experiments={categories.biology}
            titleColor="#00FF00"
          />
          <ExperimentCategory
            title="Chemistry"
            experiments={categories.chemistry}
            titleColor="#1E90FF"
          />
          <ExperimentCategory
            title="Engineering"
            experiments={categories.engineering}
            titleColor="#FF4500"
          />
          <ExperimentCategory
            title="Health Education"
            experiments={categories.healthEducation}
            titleColor="#FF69B4"
          />
          <ExperimentCategory
            title="Home Science"
            experiments={categories.homeScience}
            titleColor="#8A2BE2"
          />
        </div>
      )}
    </div>
  );
};

export default SceneSideBar;
