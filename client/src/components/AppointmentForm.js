import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch patients and doctors
    axios.get("/patients")
      .then((res) => setPatients(res.data))
      .catch((error) => console.error("Error fetching patients:", error));

    axios.get("/doctors")
      .then((res) => setDoctors(res.data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  const initialValues = {
    date: "",
    time: "",
    status: "Scheduled",
    treatment_plan: "",
    notes: "",
    diagnosis: "",
    patient_name: "",
    doctor_name: "",
  };

  const validationSchema = Yup.object({
    date: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{2}$/, "Use MM/DD/YY format")
      .required("Date is required"),
    time: Yup.string()
      .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](AM|PM)$/, "Use HH:MMAM/PM format")
      .required("Time is required"),
    status: Yup.string().required("Status is required"),
    patient_name: Yup.string().required("Patient name is required"),
    doctor_name: Yup.string().required("Doctor name is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const selectedPatient = patients.find(p => p.name === values.patient_name);
      const selectedDoctor = doctors.find(d => d.name === values.doctor_name);

      if (!selectedPatient || !selectedDoctor) {
        alert("Invalid patient or doctor selection.");
        return;
      }

      const formattedValues = {
        ...values,
        patient_id: selectedPatient.id,
        doctor_id: selectedDoctor.id,
      };

      const response = await axios.post("/appointments", formattedValues);
      alert("Appointment created successfully!");
      resetForm();
      navigate("/appointments");
    } catch (error) {
      console.error("Error creating appointment:", error.response ? error.response.data : error.message);
      alert(`Failed to create appointment. Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form id="appt-form-js">
        <h3 id="appt-form-hd">Schedule Appointment</h3>
        <label>Date (MM/DD/YYYY):</label>
        <Field type="text" name="date" />
        <ErrorMessage name="date" component="div" className="appt-form-error" />

        <label>Time (HH:MMAM/PM):</label>
        <Field type="text" name="time" />
        <ErrorMessage name="time" component="div" className="appt-form-error" />

        <label>Status:</label>
        <Field as="select" name="status">
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </Field>
        <ErrorMessage name="status" component="div" className="appt-form-error" />

        <label>Treatment Plan:</label>
        <Field type="text" name="treatment_plan" />
        <ErrorMessage name="treatment_plan" component="div" className="appt-form-error" />

        <label>Notes:</label>
        <Field type="text" name="notes" />
        <ErrorMessage name="notes" component="div" className="appt-form-error"/>

        <label>Diagnosis:</label>
        <Field type="text" name="diagnosis" />
        <ErrorMessage name="diagnosis" component="div" className="appt-form-error" />

        <label>Patient Name:</label>
        <Field as="select" name="patient_name">
          <option value="">Select a patient</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.name}>
              {patient.name}
            </option>
          ))}
        </Field>
        <ErrorMessage name="patient_name" component="div" className="appt-form-error" />

        <label>Doctor Name:</label>
        <Field as="select" name="doctor_name">
          <option value="">Select a doctor</option>
          {doctors.map(doctor => (
            <option key={doctor.id} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
        </Field>
        <ErrorMessage name="doctor_name" component="div" className="appt-form-error" />

        <button id="form-btn-submit" type="submit">Create Appointment</button>
      </Form>
    </Formik>
  );
};

export default AppointmentForm;