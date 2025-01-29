import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    fetch("/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Error fetching appointments:", error));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      fetch(`/appointments/${id}`, { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            setAppointments(appointments.filter((appointment) => appointment.id !== id));
          } else {
            console.error("Error deleting appointment.");
          }
        })
        .catch((error) => console.error("Error deleting appointment:", error));
    }
  };

  return (
    <div id="appt-list-container">
      <h2 id="appt-list-h2">Scheduled Appointments</h2>
      <div id="appt-list-grid">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.id} id="appt-list-card">
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>Doctor:</strong> {appointment.doctor.name}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
              <div id="appointment-list-actions">
                <Link to={`/appointments/${appointment.id}`} id="view-list-details">
                  View Details
                </Link>
                <button id="list-del-btn" onClick={() => handleDelete(appointment.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No appointments available.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;
