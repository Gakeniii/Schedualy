import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SpecialtyForm() {
  const [specialty, setSpecialty] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/specialties', { specialty });
      alert(response.data.message);
      navigate('/specialties');
    } catch (error) {
      console.error('There was an error creating the specialty:', error);
    }
  };

  return (
    <div id="specialty-form">
      <h2>Create Specialty</h2>
      <form id='specialty-frm' onSubmit={handleSubmit}>
        <div>
          <label>Specialty Name</label>
          <input
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
          />
        </div>
        <button id='spec-form-btn' type="submit">Add Specialty</button>
      </form>
    </div>
  );
}

export default SpecialtyForm;
