import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PatientDetail = () => {
  const { id } = useParams(); 
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    fetch(`/patients/${id}`)
      .then(response => response.json())
      .then(data => {
        setPatient(data);

        if (data.appointments && data.appointments.length > 0) {
          setAppointments(data.appointments);
        }
      });
  }, [id]);

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this patient?');

    if (confirmDelete) {
     
      fetch(`/patients/${id}`, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            alert('Patient deleted successfully');
            navigate('/patients'); 
          } else {
            alert('Failed to delete the patient');
          }
        })
        .catch(error => {
          console.error('Error deleting patient:', error);
          alert('An error occurred while deleting the patient');
        });
    }
  };

  if (!patient) return <h2 id="loading">Loading...</h2>;

  return (
    <div id="patient-detail-container">
      <main id="patient-detail-main">
        <h1 id="patient-detail-heading">Patient Information</h1>
        <h2 id="patient-name">{patient.name}, {patient.age} y/o</h2>
        <ul id="appointment-patient-1">
          {appointments.map((appointment, index) => (
            <li key={index} id='appointment-patient-details'>
              <p><strong>Previous Appointment:</strong> {appointment.prev_appointment}</p>
              <p><strong>Diagnosis :</strong> {appointment.diagnosis}</p>
              <p><strong>Notes:</strong> {appointment.notes}</p>
              <p><strong>Treatment Plan:</strong> {appointment.treatment_plan}</p>
            </li>
          ))}
        </ul>
        <h3 id="appointment-heading">Appointments:</h3>
        {appointments.length > 0 ? (
          <ul id="appointments-patient-2">
            {appointments.map((appointment, index) => (
              <li key={index} id="appointment-item">
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Doctor:</strong> {appointment.doctor.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments available</p>
        )}

        <div id='btn-details-container'>
          <button 
            id="edit-btn-ppt-details"
            onClick={() => navigate(`/patients/${id}/edit`)}>
            Edit Info
          </button>
          <button 
            id="delete-btn-ppt-details"
            onClick={handleDelete}>
            Delete Patient
          </button>
        </div>

      </main>
    </div>
  );
};

export default PatientDetail;