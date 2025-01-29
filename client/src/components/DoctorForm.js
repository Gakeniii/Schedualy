import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const DoctorForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      age: '',
      phone_no: '',
      specialty_id: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      age: Yup.number().positive('Age must be a positive number').required('Age is required'),
      phone_no: Yup.string().required('Phone number is required'),
      specialty_id: Yup.string().required('Specialty is required')
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);

      // Assuming you have an API to create a doctor
      try {
        const response = await fetch('/doctors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const result = await response.json();

        if (response.ok) {
          alert('Doctor created successfully');
          navigate('/doctors'); // Redirect to doctor list after successful submission
        } else {
          console.error('Error creating doctor:', result.message);
        }
      } catch (error) {
        console.error('Network error:', error);
      }

      setIsSubmitting(false);
    }
  });

  return (
    <div>
      <h2>Create Doctor</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
          />
          {formik.touched.age && formik.errors.age ? (
            <div>{formik.errors.age}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="phone_no">Phone Number</label>
          <input
            id="phone_no"
            name="phone_no"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone_no}
          />
          {formik.touched.phone_no && formik.errors.phone_no ? (
            <div>{formik.errors.phone_no}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="specialty_id">Specialty</label>
          <input
            id="specialty_id"
            name="specialty_id"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.specialty_id}
          />
          {formik.touched.specialty_id && formik.errors.specialty_id ? (
            <div>{formik.errors.specialty_id}</div>
          ) : null}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default DoctorForm;
