import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

   const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the doctor?")) {
      fetch(`/doctors/${id}`, {method: "DELETE",})
      .then((res) => {
        if (res.ok) {
          setDoctors(doctors.filter((doctor) => doctor.id !== id));
          alert('Doctor Deleted successfully!')
        } else {
          console.error("Failed to delete doctor");
        }
      })
      .catch((error) => console.error("Error deleting doctor:", error));
    }
  };

  return (
    <div className="doctors-list-container">
      <h2 id="doc-list-h2">Doctors List</h2>
      <div className="doctors-list">
        {doctors.length === 0 ? (
          <p>No doctors available.</p>
        ) : (
          doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <h3 id="he-doc-list">Dr.{doctor.name}</h3>
              <p>Email: {doctor.email}</p>
              <p>Age: {doctor.age}</p>
              <p>Phone: {doctor.phone_no}</p>
              <p>Specialty: {doctor.specialty || "Not Assigned"}</p>
              <div id="link-container">
                <Link to={`/doctors/${doctor.id}`} id="view-appointments">View</Link>
                <Link to={`/doctors/edit/${doctor.id}`} id="edit-button"> 
                  Edit
                </Link>
                <button id="del-doc-list" onClick={() => handleDelete(doctor.id)}>
                  Delete
                </button>
              </div>
              
            <div>
              
        </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default DoctorsList;


