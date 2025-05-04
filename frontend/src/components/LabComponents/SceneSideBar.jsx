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
      'Projectile Motion': [],
      "Newton's Second Law": [],
      'Inclined Plane': [],
    },
    biology: {
      'Microscope Observation': [],
      'DNA Extraction': [],
    },
    chemistry: {
      Titration: [],
      'Chemical Reactions': [],
    },
    engineering: {
      'Bridge Construction': [],
      'Circuit Design': [],
    },
    healthEducation: {
      'First Aid': [],
      Nutrition: [],
    },
    homeScience: {
      'Textile Testing': [],
      'Food Preservation': [],
    },
  });

  useEffect(() => {
    const fetchModels = async () => {
      try {
        // Fetch pendulum models
        const pendulumResponse = await fetch(
          'http://localhost:5000/api/labscene/pendulum-models'
        );
        const pendulumModels = await pendulumResponse.json();

        // Fetch all 3D models
        const allModelsResponse = await fetch(
          'http://localhost:5000/api/labscene/3d-models'
        );
        const allModels = await allModelsResponse.json();

        setCategories({
          physics: {
            'Pendulum Gravity': [
              { name: 'Bob', icon: '⏺️', modelUrl: pendulumModels.bob },
              {
                name: '2m String',
                icon: '🧵',
                modelUrl: pendulumModels.string,
              },
              { name: 'Stand', icon: '🪜', modelUrl: pendulumModels.stand },
              {
                name: 'Protractor',
                icon: '📐',
                modelUrl: pendulumModels.protractor,
              },
              {
                name: 'Meter Rule',
                icon: '📏',
                modelUrl: pendulumModels.meterRule,
              },
              {
                name: 'Stopwatch',
                icon: '⏱️',
                modelUrl: pendulumModels.stopwatch,
              },
            ],
            'Projectile Motion': [
              {
                name: 'Launcher',
                icon: '↗️',
                modelUrl:
                  allModels.launcher || '/models/projectile/launcher.glb',
              },
              {
                name: 'Projectile',
                icon: '⚽',
                modelUrl: allModels.projectile || '/models/projectile/ball.glb',
              },
              {
                name: 'Measuring Tape',
                icon: '📏',
                modelUrl: allModels.tape || '/models/projectile/tape.glb',
              },
            ],
            "Newton's Second Law": [
              {
                name: 'Cart',
                icon: '🛒',
                modelUrl: allModels.cart || '/models/newton/cart.glb',
              },
              {
                name: 'Weights',
                icon: '⚖️',
                modelUrl: allModels.weights || '/models/newton/weights.glb',
              },
              {
                name: 'Pulley',
                icon: '🌀',
                modelUrl: allModels.pulley || '/models/newton/pulley.glb',
              },
            ],
            'Inclined Plane': [
              {
                name: 'Plane',
                icon: '📐',
                modelUrl:
                  allModels.inclined_plane || '/models/inclined/plane.glb',
              },
              {
                name: 'Block',
                icon: '🧱',
                modelUrl:
                  allModels.wooden_block || '/models/inclined/block.glb',
              },
              {
                name: 'Protractor',
                icon: '📐',
                modelUrl: pendulumModels.protractor,
              },
            ],
          },
          biology: {
            'Microscope Observation': [
              {
                name: 'Microscope',
                icon: '🔬',
                modelUrl:
                  allModels.microscope || '/models/biology/microscope.glb',
              },
              {
                name: 'Slide',
                icon: '🖲️',
                modelUrl: allModels.slide || '/models/biology/slide.glb',
              },
            ],
            'DNA Extraction': [
              {
                name: 'Test Tube',
                icon: '🧪',
                modelUrl:
                  allModels.test_tube || '/models/biology/test_tube.glb',
              },
              {
                name: 'Centrifuge',
                icon: '🌀',
                modelUrl:
                  allModels.centrifuge || '/models/biology/centrifuge.glb',
              },
            ],
          },
          chemistry: {
            Titration: [
              {
                name: 'Burette',
                icon: '🧪',
                modelUrl: allModels.burette || '/models/chemistry/burette.glb',
              },
              {
                name: 'Flask',
                icon: '⚗️',
                modelUrl: allModels.flask || '/models/chemistry/flask.glb',
              },
            ],
            'Chemical Reactions': [
              {
                name: 'Beaker',
                icon: '🥃',
                modelUrl: allModels.beaker || '/models/chemistry/beaker.glb',
              },
              {
                name: 'Bunsen Burner',
                icon: '🔥',
                modelUrl: allModels.burner || '/models/chemistry/burner.glb',
              },
            ],
          },
          engineering: {
            'Bridge Construction': [
              {
                name: 'Beams',
                icon: '⛓️',
                modelUrl: allModels.beams || '/models/engineering/beams.glb',
              },
              {
                name: 'Joints',
                icon: '⚙️',
                modelUrl: allModels.joints || '/models/engineering/joints.glb',
              },
            ],
            'Circuit Design': [
              {
                name: 'Breadboard',
                icon: '🔌',
                modelUrl:
                  allModels.breadboard || '/models/engineering/breadboard.glb',
              },
              {
                name: 'Resistors',
                icon: '🔋',
                modelUrl:
                  allModels.resistors || '/models/engineering/resistors.glb',
              },
            ],
          },
          healthEducation: {
            'First Aid': [
              {
                name: 'Bandages',
                icon: '🩹',
                modelUrl: allModels.bandages || '/models/health/bandages.glb',
              },
              {
                name: 'Dummy',
                icon: '🧍',
                modelUrl: allModels.dummy || '/models/health/dummy.glb',
              },
            ],
            Nutrition: [
              {
                name: 'Food Models',
                icon: '🍎',
                modelUrl:
                  allModels.food_models || '/models/health/food_models.glb',
              },
              {
                name: 'Scale',
                icon: '⚖️',
                modelUrl: allModels.scale || '/models/health/scale.glb',
              },
            ],
          },
          homeScience: {
            'Textile Testing': [
              {
                name: 'Fabric Samples',
                icon: '🧵',
                modelUrl: allModels.fabrics || '/models/home/fabrics.glb',
              },
              {
                name: 'Sewing Machine',
                icon: '🧶',
                modelUrl:
                  allModels.sewing_machine || '/models/home/sewing_machine.glb',
              },
            ],
            'Food Preservation': [
              {
                name: 'Jars',
                icon: '🍯',
                modelUrl: allModels.jars || '/models/home/jars.glb',
              },
              {
                name: 'Vacuum Sealer',
                icon: '📦',
                modelUrl: allModels.sealer || '/models/home/sealer.glb',
              },
            ],
          },
        });
      } catch (error) {
        console.error('Failed to fetch models:', error);
        // Fallback to default models
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

    fetchModels();
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
