import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useRef } from 'react';

function Navbar() {
  const location = useLocation();
  const navRef = useRef();

  const showNavBar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  return (
    <>
      <header id="navbar">
        <h1 id="nav-header">BrightCare</h1>
        <nav ref={navRef}>
          <div id="navbar-links">

              <Link id='home-link' to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
              </Link>
            
            <div className="dropdown">
              <button className="dropbtn">Patients</button>
              <div className="dropdown-content">
                <Link to="/patients/form" className={location.pathname === '/patients/form' ? 'active' : ''}>
                  Add Patient
                </Link>
                <Link to="/patients" className={location.pathname === '/patients' ? 'active' : ''}>
                  Patient List
                </Link>
              </div>
            </div>

            <div className="dropdown">
              <button className="dropbtn">Appointments</button>
              <div className="dropdown-content">
                <Link to="/appointments/form" className={location.pathname === '/appointments/form' ? 'active' : ''}>
                  Schedule Appointment
                </Link>
                <Link to="/appointments" className={location.pathname === '/appointments' ? 'active' : ''}>
                  Appointment List
                </Link>
              </div>
            </div>

            <div className="dropdown">
              <button className="dropbtn">Doctors</button>
              <div className="dropdown-content">
                <Link to="/doctors/form" className={location.pathname === '/doctors/form' ? 'active' : ''}>
                  Add Doctor
                </Link>
                <Link to="/doctors" className={location.pathname === '/doctors' ? 'active' : ''}>
                  Doctor List
                </Link>
              </div>
            </div>

            <div className="dropdown">
              <button className="dropbtn">Specialties</button>
              <div className="dropdown-content">
                <Link to="/specialties/form" className={location.pathname === '/specialties/form' ? 'active' : ''}>
                  Add Specialty
                </Link>
                <Link to="/specialties" className={location.pathname === '/specialties' ? 'active' : ''}>
                  Specialties
                </Link>
              </div>
            </div>
            

          </div>

          <button className="nav-btn nav-close-btn" onClick={showNavBar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavBar}>
          <FaBars />
        </button>
      </header>
    </>
  );
}

export default Navbar;
