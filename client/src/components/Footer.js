import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
        <footer className="footer">
            <p> All rights reserved Schedually © 2024. </p>
            <div className="footer-links">
                <Link to="/about" className="footer-link">About</Link>
            </div>
        </footer>
    </div>
  )
}

export default Footer