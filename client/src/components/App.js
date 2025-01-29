import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, Switch} from 'react-router-dom';
import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./Footer";
import PatientForm from "./PatientForm";
import PatientList from "./PatientList";
import PatientDetail from "./PatientDetail";
import PatientEdit from "./PatientEdit";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import AppointmentDetail from "./AppointmentDetail";
import AppointmentEdit from "./AppointmentEdit";
import DoctorForm from "./DoctorForm";
import DoctorsList from "./DoctorList";
import DoctorDetail from "./DoctorDetail";
import DoctorEdit from "./DoctorEdit";


function App() {
    return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/patients" element={<PatientList/>} />
        <Route path="/patients/:id" element={<PatientDetail />} />
        <Route path="/patients/:id/edit" element={<PatientEdit />} />

        <Route path="/appointments" element={<AppointmentList />} />
        <Route path="/appointments/:id" element={<AppointmentDetail />} />
        <Route path="/appointments/edit/:id" element={<AppointmentEdit />} />

        <Route path="/doctors" element={<DoctorsList />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />
        <Route path="/doctors/edit/:id" element={<DoctorEdit />} />

      
      
      
        <Route path="/patients/form" element={<PatientForm />} />
        <Route path="/doctors/form" element={<DoctorForm />} />
        <Route path="/appointments/form" element={<AppointmentForm />} />
        {/* <Route path="/payment-options" element={<PaymentOptionForm />} /> */}
        {/* <Route path="/specialties" element={<SpecialtiesForm />} /> */}

      </Routes>
      <br></br>
      <Footer />
    </div>
  );

}

export default App;
// import React from 'react';
// import { Route, Routes, Navigate} from 'react-router-dom';
// import Navbar from './Navbar';
// import Home from './Home';
// import AboutUs from './AboutUs'
// import PatientCard from './PatientCard';
// import PatientDetail from './PatientDetail';
// import UpdatePatient from './UpdatePatient';
// import AddPatient from './AddPatient';
// import Footer from './Footer'

// function App() {

//   return (
//     <div className="app-container">
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="*" element={<Navigate to="/" replace />} />
//         <Route path="/about" element={<AboutUs/>} />
//         <Route path="/patients" element={<PatientCard />} />
//         <Route path="/patients/:id" element={<PatientDetail />} />
//         <Route path="/patients/:id/edit" element={<UpdatePatient />} />
//         <Route path="/add-patient" element={<AddPatient />} />
//       </Routes> <br></br>
//       <Footer />
//     </div>
//   )
// };