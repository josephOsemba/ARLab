import React, { useState } from 'react';

const OscillationFormModal = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    length: '',
    time20: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateAndSubmit = () => {
    const length = parseFloat(formData.length);
    const time20 = parseFloat(formData.time20);
    const period = time20 / 20;
    const t_squared = period ** 2;

    onSubmit({ length, time20, period, t_squared });
    setFormData({ length: '', time20: '' });
  };

  return (
    <div className="form-modal">
      <input
        type="number"
        name="length"
        value={formData.length}
        onChange={handleChange}
        placeholder="Length (cm)"
      />
      <input
        type="number"
        name="time20"
        value={formData.time20}
        onChange={handleChange}
        placeholder="Time for 20 Oscillations (s)"
      />
      <button onClick={calculateAndSubmit}>Add Record</button>
    </div>
  );
};

export default OscillationFormModal;
