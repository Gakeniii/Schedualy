// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// const ScheduleAppointment = () => {
//     // Formik initial values and validation schema
//     const formik = useFormik({
//         initialValues: {
//             date: '',
//             time: '',
//             status: 'Scheduled', // Default status
//             treatment_plan: '',
//             notes: '',
//             diagnosis: '',
//             patient_id: '',
//             doctor_id: '',
//         },
//         validationSchema: Yup.object({
//             date: Yup.date().required('Date is required').nullable(),
//             time: Yup.string()
//                 .matches(
//                     /^([0-9]{2}):([0-9]{2})$/, 
//                     'Time must be in HH:mm format'
//                 )
//                 .required('Time is required'),
//             patient_id: Yup.number().required('Patient ID is required'),
//             doctor_id: Yup.number().required('Doctor ID is required'),
//         }),
//         onSubmit: async (values) => {
//             // Submit the form data to your backend API
//             const response = await fetch('/appointments', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(values),
//             });

//             const result = await response.json();
//             alert(`Appointment scheduled with ID: ${result.appointment}`);
//         },
//     });

//     return (
//         <div>
//             <h2>Schedule an Appointment</h2>
//             <form onSubmit={formik.handleSubmit}>
//                 <div>
//                     <label htmlFor="date">Date</label>
//                     <input
//                         type="date"
//                         id="date"
//                         name="date"
//                         value={formik.values.date}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.date && formik.errors.date ? (
//                         <div>{formik.errors.date}</div>
//                     ) : null}
//                 </div>

//                 <div>
//                     <label htmlFor="time">Time (HH:mm)</label>
//                     <input
//                         type="text"
//                         id="time"
//                         name="time"
//                         value={formik.values.time}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.time && formik.errors.time ? (
//                         <div>{formik.errors.time}</div>
//                     ) : null}
//                 </div>

//                 <div>
//                     <label htmlFor="status">Status</label>
//                     <input
//                         type="text"
//                         id="status"
//                         name="status"
//                         value={formik.values.status}
//                         onChange={formik.handleChange}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="treatment_plan">Treatment Plan</label>
//                     <textarea
//                         id="treatment_plan"
//                         name="treatment_plan"
//                         value={formik.values.treatment_plan}
//                         onChange={formik.handleChange}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="notes">Notes</label>
//                     <textarea
//                         id="notes"
//                         name="notes"
//                         value={formik.values.notes}
//                         onChange={formik.handleChange}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="diagnosis">Diagnosis</label>
//                     <textarea
//                         id="diagnosis"
//                         name="diagnosis"
//                         value={formik.values.diagnosis}
//                         onChange={formik.handleChange}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="patient_id">Patient ID</label>
//                     <input
//                         type="number"
//                         id="patient_id"
//                         name="patient_id"
//                         value={formik.values.patient_id}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.patient_id && formik.errors.patient_id ? (
//                         <div>{formik.errors.patient_id}</div>
//                     ) : null}
//                 </div>

//                 <div>
//                     <label htmlFor="doctor_id">Doctor ID</label>
//                     <input
//                         type="number"
//                         id="doctor_id"
//                         name="doctor_id"
//                         value={formik.values.doctor_id}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.doctor_id && formik.errors.doctor_id ? (
//                         <div>{formik.errors.doctor_id}</div>
//                     ) : null}
//                 </div>

//                 <div>
//                     <button type="submit">Schedule Appointment</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ScheduleAppointment;

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppointmentForm = () => {

    const navigate = useNavigate();
    
  const initialValues = {
    date: "",
    time: "",
    status: "Scheduled",
    treatment_plan: "",
    notes: "",
    diagnosis: "",
    patient_id: "",
    doctor_id: "",
  };

  const validationSchema = Yup.object({
    date: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/, "Use MM/DD/YYYY format")
      .required("Date is required"),
    time: Yup.string()
      .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](AM|PM)$/, "Use HH:MMAM/PM format")
      .required("Time is required"),
    status: Yup.string().required("Status is required"),
    patient_id: Yup.number().required("Patient ID is required"),
    doctor_id: Yup.number().required("Doctor ID is required"),
  });
  
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("/appointments", values);
      alert("Appointment created successfully!");
      resetForm();
      navigate("/appointments");
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to create appointment.");
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <label>Date (MM/DD/YYYY):</label>
        <Field type="text" name="date" />
        <ErrorMessage name="date" component="div" className="error" />

        <label>Time (HH:MMAM/PM):</label>
        <Field type="text" name="time" />
        <ErrorMessage name="time" component="div" className="error" />

        <label>Status:</label>
        <Field as="select" name="status">
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </Field>
        <ErrorMessage name="status" component="div" className="error" />

        <label>Treatment Plan:</label>
        <Field type="text" name="treatment_plan" />
        <ErrorMessage name="treatment_plan" component="div" className="error" />

        <label>Notes:</label>
        <Field type="text" name="notes" />
        <ErrorMessage name="notes" component="div" className="error" />

        <label>Diagnosis:</label>
        <Field type="text" name="diagnosis" />
        <ErrorMessage name="diagnosis" component="div" className="error" />

        <label>Patient ID:</label>
        <Field type="number" name="patient_id" />
        <ErrorMessage name="patient_id" component="div" className="error" />

        <label>Doctor ID:</label>
        <Field type="number" name="doctor_id" />
        <ErrorMessage name="doctor_id" component="div" className="error" />

        <button type="submit">Create Appointment</button>
      </Form>
    </Formik>
  );
};

export default AppointmentForm;
