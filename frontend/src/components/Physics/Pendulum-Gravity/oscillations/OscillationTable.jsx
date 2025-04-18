import React, { useState } from 'react';
import PropTypes from 'prop-types';

const OscillationTable = ({ data, onUpdate, onDelete }) => {
  const [editableId, setEditableId] = useState(null);
  const [formState, setFormState] = useState({ length: '', time20: '' });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 'Must be a number';

    if (name === 'length') {
      if (numValue <= 0 || numValue > 2)
        return 'Length must be between 0 and 2 meters';
    }

    if (name === 'time20') {
      if (numValue <= 0 || numValue > 100)
        return 'Time must be between 0 and 100 seconds';
    }

    return '';
  };

  const startEdit = (record) => {
    setEditableId(record.id);
    setFormState({
      length: record.length?.toString() || '',
      time20: record.time20?.toString() || '',
      id: record.id,
    });
    setErrors({});
  };

  const cancelEdit = () => {
    setEditableId(null);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setErrors((prev) => ({ ...prev, [name]: error }));
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const lengthError = validateField('length', formState.length);
    const timeError = validateField('time20', formState.time20);

    if (lengthError || timeError) {
      setErrors({
        length: lengthError,
        time20: timeError,
      });
      return;
    }

    try {
      await onUpdate(formState.id, {
        length: parseFloat(formState.length),
        time20: parseFloat(formState.time20),
      });
      cancelEdit();
    } catch (error) {
      console.error('Save failed:', error);
      // Consider adding user feedback here
    }
  };

  const formatValue = (value) => {
    if (value === undefined || value === null) return '-';
    return typeof value === 'number' ? value.toFixed(3) : value;
  };

  return (
    <table className="oscillation-table">
      <thead>
        <tr>
          <th>Length (m)</th>
          <th>Time for 20 Oscillations (s)</th>
          <th>Period (s)</th>
          <th>T² (s²)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((record) => (
          <tr key={record.id}>
            <td>
              {editableId === record.id ? (
                <>
                  <input
                    type="number"
                    name="length"
                    value={formState.length}
                    onChange={handleChange}
                    className={errors.length ? 'error' : ''}
                    step="0.001"
                    min="0.001"
                    max="2"
                  />
                  {errors.length && (
                    <div className="error-message">{errors.length}</div>
                  )}
                </>
              ) : (
                formatValue(record.length)
              )}
            </td>
            <td>
              {editableId === record.id ? (
                <>
                  <input
                    type="number"
                    name="time20"
                    value={formState.time20}
                    onChange={handleChange}
                    className={errors.time20 ? 'error' : ''}
                    step="0.01"
                    min="0.01"
                    max="100"
                  />
                  {errors.time20 && (
                    <div className="error-message">{errors.time20}</div>
                  )}
                </>
              ) : (
                formatValue(record.time20)
              )}
            </td>
            <td>{formatValue(record.period)}</td>
            <td>{formatValue(record.t_squared)}</td>
            <td className="actions">
              {editableId === record.id ? (
                <>
                  <button
                    onClick={handleSave}
                    className="save-btn"
                    disabled={errors.length || errors.time20}
                  >
                    Save
                  </button>
                  <button onClick={cancelEdit} className="cancel-btn">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(record)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(record.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

OscillationTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      length: PropTypes.number,
      time20: PropTypes.number,
      period: PropTypes.number,
      t_squared: PropTypes.number,
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default OscillationTable;
