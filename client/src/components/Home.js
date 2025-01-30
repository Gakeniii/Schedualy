import React from 'react';
import Profile from '../assests/happy-group.jpg'

const Home = () => (
  <div id="home">
    <div id="content">
      <div id="text">
        <h1>Hello Dr. Gakeni,</h1>
        <p>We hope that this BrightCare is of great continous service to you.</p>
        <p>Keeping track of the welfare of the patients, patient appointments.</p>
        <em>Our patients and doctors well-being is our top priority!</em>
      </div>
      <div id="image">
        <img src={Profile} alt="Patient registry" ></img>
      </div>
    </div>
  </div>
);

export default Home;