import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  return (
    <div className="appointments-container">
      <h2>Scheduled Appointments</h2>
      <div className="appointments-grid">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card">
            <p><strong>Date:</strong> {appointment.date}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
            <p><strong>Doctor:</strong> {appointment.doctor.name}</p>
            <p><strong>Status:</strong> {appointment.status}</p>
            <Link to={`/appointments/${appointment.id}`} className="view-details">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsList;
