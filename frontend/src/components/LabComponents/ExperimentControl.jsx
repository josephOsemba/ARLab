import { useState, useEffect } from 'react';

const ExperimentControls = ({ object, onUpdate, onRemove }) => {
  const [properties, setProperties] = useState({ ...object.properties });
  const [position, setPosition] = useState([...object.position]);
  const [rotation, setRotation] = useState([...object.rotation]);
  const [scale, setScale] = useState([...object.scale]);

  useEffect(() => {
    const updates = { properties, position, rotation, scale };
    onUpdate(object.id, updates);
  }, [properties, position, rotation, scale]);

  const handlePropertyChange = (key, value) => {
    setProperties({ ...properties, [key]: value });
  };

  const handlePositionChange = (axis, value) => {
    const newPosition = [...position];
    newPosition[axis] = parseFloat(value) || 0;
    setPosition(newPosition);
  };

  const handleRotationChange = (axis, value) => {
    const newRotation = [...rotation];
    newRotation[axis] = parseFloat(value) || 0;
    setRotation(newRotation);
  };

  const handleScaleChange = (axis, value) => {
    const newScale = [...scale];
    newScale[axis] = parseFloat(value) || 1;
    setScale(newScale);
  };

  return (
    <div className="experiment-controls">
      <h3>{object.type} Controls</h3>

      <div className="transform-controls">
        <h4>Position</h4>
        <div className="control-group">
          <label>
            X:{' '}
            <input
              type="number"
              value={position[0]}
              onChange={(e) => handlePositionChange(0, e.target.value)}
            />
          </label>
          <label>
            Y:{' '}
            <input
              type="number"
              value={position[1]}
              onChange={(e) => handlePositionChange(1, e.target.value)}
            />
          </label>
          <label>
            Z:{' '}
            <input
              type="number"
              value={position[2]}
              onChange={(e) => handlePositionChange(2, e.target.value)}
            />
          </label>
        </div>

        <h4>Rotation</h4>
        <div className="control-group">
          <label>
            X:{' '}
            <input
              type="number"
              value={rotation[0]}
              onChange={(e) => handleRotationChange(0, e.target.value)}
            />
          </label>
          <label>
            Y:{' '}
            <input
              type="number"
              value={rotation[1]}
              onChange={(e) => handleRotationChange(1, e.target.value)}
            />
          </label>
          <label>
            Z:{' '}
            <input
              type="number"
              value={rotation[2]}
              onChange={(e) => handleRotationChange(2, e.target.value)}
            />
          </label>
        </div>

        <h4>Scale</h4>
        <div className="control-group">
          <label>
            X:{' '}
            <input
              type="number"
              value={scale[0]}
              onChange={(e) => handleScaleChange(0, e.target.value)}
            />
          </label>
          <label>
            Y:{' '}
            <input
              type="number"
              value={scale[1]}
              onChange={(e) => handleScaleChange(1, e.target.value)}
            />
          </label>
          <label>
            Z:{' '}
            <input
              type="number"
              value={scale[2]}
              onChange={(e) => handleScaleChange(2, e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="property-controls">
        <h4>Properties</h4>
        {Object.entries(properties).map(([key, value]) => (
          <div key={key} className="property-control">
            <label>
              {key}:
              <input
                type={typeof value === 'number' ? 'number' : 'text'}
                value={value}
                onChange={(e) =>
                  handlePropertyChange(
                    key,
                    typeof value === 'number'
                      ? parseFloat(e.target.value)
                      : e.target.value
                  )
                }
              />
            </label>
          </div>
        ))}
      </div>

      <button className="remove-button" onClick={() => onRemove(object.id)}>
        Remove Object
      </button>
    </div>
  );
};

export default ExperimentControls;
