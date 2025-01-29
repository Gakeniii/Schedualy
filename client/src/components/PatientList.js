import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/patients')  // Change URL to your Flask API endpoint
      .then(response => response.json())
      .then(data => setPatients(data));
  }, []);

  const searchPatients = search
    ? patients.filter(patient =>
        patient.name.toLowerCase().includes(search.toLowerCase())
      )
    : patients;

  return (
    <>
      <div id="patient-info">
        <h2 id="info">Patients</h2>
        <Search handleSearch={setSearch} />
        <div className="card-container">
          {searchPatients.length > 0 ? (
            searchPatients.map(patient => (
              <div className="patient-card" key={patient.id}>
                <div className="card-header">
                  <h3>{patient.name}</h3>
                </div>
                <div className="card-body">
                  <p>{patient.diagnosis}</p><br/>
                  <p id="diagnosis">Next appt: {patient.date}</p>
                  <Link to={`/patients/${patient.id}`} className="view-details-link">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>LOADING ...</p>
          )}
        </div>
      </div>
      <br /><br /><br /><br />
    </>
  );
};

export default PatientList;
