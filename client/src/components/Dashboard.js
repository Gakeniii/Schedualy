// import { useState, useEffect } from 'react';
// import PatientForm from './PatientForm';
// import PatientList from './PatientCard';
// import Sidebar from './Sidebar';
// import axios from 'axios';


// const Dashboard = () => {
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [activeSection, setActiveSection] = useState('patients');

//   useEffect(() => {
//     // Fetch all patients on mount
//     axios.get('/api/patients')
//       .then(response => setPatients(response.data))
//       .catch(error => console.error('Error fetching patients:', error));
//   }, []);

//   const handlePatientCreateSuccess = (patient) => {
//     setPatients([...patients, patient]);
//   };

//   const handlePatientEditSuccess = (updatedPatient) => {
//     const updatedPatients = patients.map(patient =>
//       patient.id === updatedPatient.id ? updatedPatient : patient
//     );
//     setPatients(updatedPatients);
//     setSelectedPatient(null);
//   };

//   const handlePatientDelete = (patientId) => {
//     axios.delete(`/api/patients/${patientId}`)
//       .then(() => {
//         setPatients(patients.filter(patient => patient.id !== patientId));
//       })
//       .catch(error => console.error('Error deleting patient:', error));
//   };

//   return (
//     <div className="dashboard">
//       <h1>Patient Dashboard</h1>

//       <Sidebar setActiveSection={setActiveSection} />
//       <div className="patient-form">
//         <h2>{selectedPatient ? 'Edit Patient' : 'Add New Patient'}</h2>
//         <PatientForm 
//           patientId={selectedPatient?.id} 
//           onSuccess={selectedPatient ? handlePatientEditSuccess : handlePatientCreateSuccess}
//         />
//       </div>

//       <div className="patient-list">
//         <h2>Patient List</h2>
//         <PatientList 
//           patients={patients} 
//           onEdit={setSelectedPatient} 
//           onDelete={handlePatientDelete} 
//         />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
