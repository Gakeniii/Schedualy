import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function SpecialtyEdit() {
  const { id } = useParams();
  const [specialty, setSpecialty] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialty = async () => {
      try {
        const response = await axios.get(`/specialties/${id}`);
        setSpecialty(response.data.specialty);
      } catch (error) {
        console.error('Error fetching specialty:', error);
      }
    };
    fetchSpecialty();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/specialties/${id}`, { specialty });
      alert(response.data.message);
      navigate('/specialties');
    } catch (error) {
      console.error('Error updating specialty:', error);
    }
  };

  return (
    <div id="specialty-edit">
      <h2 id='spec-edit-h2'>Edit Specialty</h2>
      <form id="spec-edit-form" onSubmit={handleSubmit}>
        <div>
          <label>Specialty Name</label>
          <input
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
          />
        </div>
        <button id='spec-edit-btn' type="submit">Update Specialty</button>
      </form>
    </div>
  );
}

export default SpecialtyEdit;