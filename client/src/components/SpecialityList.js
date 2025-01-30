import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SpecialtyList() {
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get('/specialties');
        setSpecialties(response.data);
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };
    fetchSpecialties();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this specialty?')) {
      try {
        await axios.delete(`/specialties/${id}`);
        setSpecialties(specialties.filter((specialty) => specialty.id !== id));
        alert('Specialty deleted successfully!');
      } catch (error) {
        console.error('Error deleting specialty:', error);
      }
    }
  };

  return (
    <div id="specialty-list">
      <h2 id='spec-list-h2' >Specialties</h2>
      <Link to="/specialties/form">Create New Specialty</Link>
      <ul id='spec-list-ul'>
        {specialties.map((specialty) => (
          <li key={specialty.id}>
            <h3 id='spec-list-h3' >{specialty.specialty}</h3>
            <ul id='spec-list-dets'>
              {specialty.doctors.map((doctor) => (
                <li key={doctor.id}>
                  <p>{doctor.name}</p>
                  <p>{doctor.email}</p>
                  <p>{doctor.phone_no}</p>
                </li>
              ))}
            </ul>
            <Link id='spec-list-edit' to={`/specialties/edit/${specialty.id}`}>Edit</Link>
            <button id="spec-lidt-del" onClick={() => handleDelete(specialty.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpecialtyList;