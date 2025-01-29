import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PatientDetail = () => {
  const { id } = useParams(); // Get patient ID from URL
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/patients/${id}`)  // Fetch patient details
      .then(response => response.json())
      .then(data => setPatient(data));
  }, [id]);

  if (!patient) return <h2 id='loading'>Loading...</h2>;

  return (
    <div className="patient-detail-container">
      <main className="patient-detail-main">
        <h1 className="patient-detail-heading">Patient Information</h1>
        <h2 className="patient-name">{patient.name}, {patient.age} y/o</h2>
        <p className="appointment-info-prev">
          <strong>Previous Appointment:</strong> {patient.prev_appointment}
        </p>
        <p className="diagnosis-info"><strong>DIAGNOSIS:</strong> {patient.diagnosis}</p>
        <p className="patients-notes"><h3>Notes:</h3> {patient.notes}</p>
        <p className="observation-notes"><h3>Treatment Plan:</h3> {patient.treatment_plan}</p>
        <p className="appointment-info-nxt">
          <strong>Next Appointment:</strong> {patient.appointment.date} at {patient.appointment.time}
        </p>

        <button 
          className="edit-button"
          onClick={() => navigate(`/patients/${id}/edit`)}  // Navigate to the edit page
        >
          Edit Info
        </button>
      </main>
      
      <br/><br/><br/>
    </div>
  );
};

export default PatientDetail;
