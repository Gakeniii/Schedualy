import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DoctorAppointments = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    // Fetch doctor details with appointments by doctor ID
    fetch(`/doctors/${id}`)
      .then((res) => res.json())
      .then((data) => setDoctor(data))
      .catch((error) => console.error("Error fetching doctor details:", error));
  }, [id]);

  if (!doctor) {
    return <p>Loading doctor details...</p>;
  }

  return (
    <div className="doctor-appointments-container">
      <h2 id="doc-dets-h2">Dr.{doctor.name}'s Appointments</h2>
      {doctor.appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        <div className="appointments-list">
          {doctor.appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
              <p><strong>Diagnosis:</strong> {appointment.diagnosis || "N/A"}</p>
              <p><strong>Treatment Plan:</strong> {appointment.treatment_plan || "N/A"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
