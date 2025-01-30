import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    age: "",
    phone_no: "",
    specialty_id: "",
  });

  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    fetch(`/doctors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDoctor({
          name: data.name,
          email: data.email,
          age: data.age,
          phone_no: data.phone_no,
          specialty_id: data.specialty_id,
        });
      })
      .catch((error) => console.error("Error fetching doctor details:", error));
    }, [id])

    useEffect(() => {
      fetch(`/specialties`)
        .then((res) => res.json())
        .then((data) => {
          setSpecialties(data);
        })
        .catch((error) => console.error('Error fetching specialties:', error));
    }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedDoctor = {
      name: doctor.name,
      email: doctor.email,
      age: doctor.age,
      phone_no: doctor.phone_no,
      specialty_id: doctor.specialty_id,
    };

    fetch(`/doctors/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDoctor),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Doctor updated") {
          navigate(`/doctors`);
        }
      })
      .catch((error) => console.error("Error updating doctor:", error));
  };

  return (
    <div id="edit-doctor-container">
      <h2>Edit Doctor</h2>
      <form id='edit-form' onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={doctor.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={doctor.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={doctor.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_no"
            value={doctor.phone_no}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Specialty:</label>
          <select 
            name="specialty_id"
            value={doctor.specialty_id}
            onChange={handleChange}
          >
            <option value="">Select a speciality</option>
            {specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.specialty}
              </option>
            ))}
          </select>
        </div>
        <button id="submit" type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditDoctor;