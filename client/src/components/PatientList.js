import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchPatient from './SearchPatient';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/patients')  // Change URL to your Flask API endpoint
      .then(response => response.json())
      .then(data => {
        setPatients(data);
        console.log(data)

      });
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
        <SearchPatient handleSearch={setSearch} />
        <div className="card-container">
          {searchPatients.length > 0 ? (
            searchPatients.map(patient => (
              <div className="patient-card" key={patient.id}>
                <div className="card-header">
                  <h3>{patient.name}</h3>
                </div>
                <div className="card-body">
                  <ul className='patient-card-details'>
                    {patient.appointments && patient.appointments.length > 0 ? (
                      patient.appointments.map((appointment, index) => (
                        <li key={index} className='pat-card-details'>
                          <p id="next-app"><strong id="nxt">Next Appt:</strong> {appointment.date}</p>
                        </li>
                      ))
                    ) : (
                      <p>No appointments available</p>
                    )}
                  </ul>

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
