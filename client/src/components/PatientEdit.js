import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PatientEdit = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState({
    name: '',
    phone_no: '',
    age: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/patients/${id}`)  // Fetch patient details to populate form
      .then(response => response.json())
      .then(data => setPatient(data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({
      ...patient,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/patients/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    })
    .then(response => response.json())
    .then(() => navigate(`/patients/${id}`));  
  };

  return (
    <div className="patient-edit-container">
      <h1 id='edit-ppt-hd'>Edit Patient Information</h1>
      <form id='edit-ppt' onSubmit={handleSubmit}>
        <label>Name:
          <input 
            type="text" 
            name="name" 
            value={patient.name} 
            onChange={handleChange} 
          />
        </label>
        <br />
        <label>Phone No:
          <input 
            type="text" 
            name="phone_no" 
            value={patient.phone_no} 
            onChange={handleChange} 
          />
        </label>
        <br />
        <label>Age:
          <input 
            type="number" 
            name="age" 
            value={patient.age} 
            onChange={handleChange} 
          />
        </label>
        <br />
        <button id="edit-ppt-btn" type="submit">Update Patient</button>
      </form>
    </div>
  );
};

export default PatientEdit;