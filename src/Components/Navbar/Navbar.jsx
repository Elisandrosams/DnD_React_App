import React from 'react';
import Logo from "../../Assets/Personal Logo.png";
import './Navbar.css'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar_container">
        <div className="navbar_logo--container">
            <img src={Logo} alt="Logo" className='navbar_logo'/>
        </div>
        <div className="navbar_links--container">
            <ul className='nav_links'>
                <Link to="/"><li className='nav_link'>Home</li></Link>
                <Link to="/Spells"><li className='nav_link'>Spells</li></Link>
                <Link to="/Maps"><li className='nav_link'>Maps</li></Link>
                <Link to="/Contact"><li className='nav_link'>Contact</li></Link>
            </ul>
        </div>
    </div>
  )
}

export default Navbar