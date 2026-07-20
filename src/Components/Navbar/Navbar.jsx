import React from 'react';
import './Navbar.css'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar_container">
        
        <div className="navbar_links--container">
            <ul className='nav_links'>
                <Link to="/"><li className='nav_link'>Home</li></Link>
                <Link to="/Spells"><li className='nav_link'>Spells</li></Link>
                <Link to="/Maps"><li className='nav_link'>Maps</li></Link>
            </ul>
        </div>
    </div>
  )
}

export default Navbar