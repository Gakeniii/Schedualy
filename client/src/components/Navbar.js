import { Link } from 'react-router-dom';
import { FaBars,FaTimes } from 'react-icons/fa';
import { useRef } from 'react';


function Navbar(){
  const navRef = useRef();

  const showNavBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  }

  return  (
    <>
      <header id="navbar">
          <h1 id="nav-header">Schedualy</h1>
          <nav ref={navRef}>
            {/* <Link to="/"> Home </Link>
            <Link to="/patients"> Patients</Link>
            <Link to="/appointments">Appointments</Link>
            <Link to="/doctors">Doctors</Link>
            <Link to="/payment-options">Payment</Link> */}

        
            <div className="navbar-links">
                <div className="dropdown">
                  <button className="dropbtn">Patients</button>
                  <div className="dropdown-content">
                    <Link to="/patients/form">Create Patient</Link>
                    <Link to="/patients">Patient List</Link>

                  </div>
                </div>
                <div className="dropdown">
                  <button className="dropbtn">Appointments</button>
                  <div className="dropdown-content">
                    <Link to="/appointments/form">Create Appointment</Link>
                    <Link to="/appointments">Appointment List</Link>
                  </div>
                </div>
                <div className="dropdown">
                  <button className="dropbtn">Doctors</button>
                  <div className="dropdown-content">
                    <Link to="/doctors/form">Create Doctor</Link>
                    <Link to="/doctors">Doctor List</Link>
                </div>
              </div>
            </div>
            
            <button className='nav-btn nav-close-btn' onClick={showNavBar}>
              <FaTimes />
            </button>
          </nav>
          <button className="nav-btn" onClick={showNavBar}>
            <FaBars />
          </button>
      </header>

      {/* <div className="profile">
        <button className="p-name">Dr. Gakeni</button>
        <img src="" alt="Profile Image" className="profile-pic" />
      </div> */}
    </>
  )
};

export default Navbar;

// import React from 'react';
// import { Link } from 'react-router-dom';

// const NavigationBar = () => {
//   return (
//     <div className="navbar">
//       <div className="navbar-brand">
//         <Link to="/">AppName</Link>
//       </div>
//       <div className="navbar-links">
//         <div className="dropdown">
//           <button className="dropbtn">Doctors</button>
//           <div className="dropdown-content">
//             <Link to="/doctor-form">Create Doctor</Link>
//             <Link to="/doctors">Doctor List</Link>
//           </div>
//         </div>
        
//         <div className="dropdown">
//           <button className="dropbtn">Appointments</button>
//           <div className="dropdown-content">
//             <Link to="/appointment-form">Create Appointment</Link>
//             <Link to="/appointments">Appointment List</Link>
//           </div>
//         </div>

//         {/* Add other dropdowns or links for different routes */}
//       </div>
//     </div>
//   );
// };

// export default NavigationBar;

