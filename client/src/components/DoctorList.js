import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch all doctors on component mount
  useEffect(() => {
    fetch("/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  // const handleDelete = async (id) => {
  //   if (!window.confirm('Are you sure you want to delete this doctor?')) return;

  //   try {
  //     const response = await fetch(`/doctors/${id}`, {
  //       method: 'DELETE',
  //     });

  //     if (response.ok) {
  //       // Remove the deleted patient from the list
  //       setDoctors(doctors.filter(doctor => doctor.id !== id));
  //       return alert('Doctor deleted successfully');
  //     } else {
  //       console.error('Failed to delete doctor');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting doctor:', error);
  //   }
  // };


  return (
    <div className="doctors-list-container">
      <h2>Doctors List</h2>
      <div className="doctors-list">
        {doctors.length === 0 ? (
          <p>No doctors available.</p>
        ) : (
          doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <h3>{doctor.name}</h3>
              <p>Email: {doctor.email}</p>
              <p>Age: {doctor.age}</p>
              <p>Phone: {doctor.phone_no}</p>
              <p>Specialty: {doctor.specialty || "Not Assigned"}</p>
              <Link to={`/doctors/${doctor.id}`} className="view-appointments">View Appointments</Link>
            <div>
            {/* Edit Button */}
            <Link to={`/doctors/edit/${doctor.id}`} className="edit-button"> 
            Edit Doctor
            </Link>  
        </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default DoctorsList;


