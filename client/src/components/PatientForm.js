import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PatientForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    phone_no: "",
    age: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone_no: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    age: Yup.number().positive("Age must be positive").required("Age is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("/patients", values);
      alert("Patient created successfully!");
      resetForm();
      navigate("/patients")
    } catch (error) {
      console.error("Error creating patient:", error);
      alert("Failed to create patient.");
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <label>Name:</label>
        <Field type="text" name="name" />
        <ErrorMessage name="name" component="div" className="error" />

        <label>Phone Number:</label>
        <Field type="text" name="phone_no" />
        <ErrorMessage name="phone_no" component="div" className="error" />

        <label>Age:</label>
        <Field type="number" name="age" />
        <ErrorMessage name="age" component="div" className="error" />

        <button type="submit">Create Patient</button>
      </Form>
    </Formik>
  );
};

export default PatientForm;
