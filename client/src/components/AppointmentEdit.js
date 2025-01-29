import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [appointment, setAppointment] = useState({
    date: '',
    time: '',
    status: '',
    treatment_plan: '',
    notes: '',
    diagnosis: '',
  });

  useEffect(() => {
    // Fetch the appointment details when component mounts
    fetch(`/appointments/${id}`)
      .then((res) => res.json())
      .then((data) => setAppointment(data))
      .catch((error) => console.error("Error fetching appointment details:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedAppointment = {
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      treatment_plan: appointment.treatment_plan,
      notes: appointment.notes,
      diagnosis: appointment.diagnosis,
    };

    // Send PATCH request to update the appointment details
    fetch(`/appointments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAppointment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Appointment updated") {
          // Navigate to the details page after update
          navigate(`/appointments/${id}`);
        }
      })
      .catch((error) => console.error("Error updating appointment:", error));
  };

  return (
    <div className="edit-container">
      <h2>Edit Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="text"
            name="date"
            value={appointment.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="text"
            name="time"
            value={appointment.time}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            name="status"
            value={appointment.status}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Treatment Plan:</label>
          <textarea
            name="treatment_plan"
            value={appointment.treatment_plan}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            name="notes"
            value={appointment.notes}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Diagnosis:</label>
          <textarea
            name="diagnosis"
            value={appointment.diagnosis}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditAppointment;
