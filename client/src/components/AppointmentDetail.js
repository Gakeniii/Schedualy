
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    fetch(`/appointments/${id}`)
      .then((res) => res.json())
      .then((data) => setAppointment(data))
      .catch((error) => console.error("Error fetching appointment details:", error));
  }, [id]);

  const handleEditClick = () => {
    navigate(`/appointments/edit/${id}`);
  };

  if (!appointment) {
    return <p>Loading appointment details...</p>;
  }

  return (
    <div id="details-container">
      <h2 id="appt-details-heading">Appointment Details</h2>
      <div id="details-card">
        <h2 id="appt-detail">{appointment.patient.name} {appointment.patient.age} y/o</h2>
        <p><strong>Date:</strong> {appointment.date}</p>
        <p><strong>Time:</strong> {appointment.time}</p>
        <p><strong>Doctor:</strong> {appointment.doctor.name} ({appointment.doctor.email})</p>
        <p><strong>Diagnosis:</strong> {appointment.diagnosis || "N/A"}</p>
        <p><strong>Treatment Plan:</strong> {appointment.treatment_plan || "N/A"}</p>
        <p><strong>Notes:</strong> {appointment.notes || "N/A"}</p>
        <p><strong>Status:</strong> {appointment.status}</p>
        {appointment.status === "Scheduled" && (
          <button id="btn-appt-details" onClick={handleEditClick}>Edit Appointment</button>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetails;
