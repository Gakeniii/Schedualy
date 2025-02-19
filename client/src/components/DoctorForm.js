import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const DoctorForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await fetch('/specialties');
        const data = await response.json();
        setSpecialties(data);
        // console.log('Fetched specialties:', data);
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };

    fetchSpecialties();
  }, []);


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
      console.log("doctors:", values);
      setIsSubmitting(true);

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
          navigate('/doctors'); 
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
    <div id='doc-form'>
      <h2 id='doc-form-h2'>Add Doctor</h2>
      <form className='add-doc-form' onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
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
          <label htmlFor="email">Email:</label>
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
          <label htmlFor="age">Age:</label>
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
          <label htmlFor="phone_no">Phone Number:</label>
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
          <label id='specialty_id' htmlFor="specialty_id">Specialty:</label>
          <select
            id="specialty_id"
            name="specialty_id"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.specialty_id}
            >
              <option value="" label='Select a specialty' />
              {specialties.map((specialty) => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.specialty} ({specialty.doctor_count} doctors)
                </option>
              ))}
            </select>
            {formik.touched.specialty_id && formik.errors.specialty_id ? (
            <div>{formik.errors.specialty_id}</div>
          ) : null}
        </div>


        <button id='add-doc-form' type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default DoctorForm;
