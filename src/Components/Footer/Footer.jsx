import React from 'react'
import Logo from "../../Assets/Personal Logo.png";
import './Footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
        <img src={Logo} alt="Logo" className='footer_logo' />
        <ul className='footer_links'>
           <Link to="/"><li className='footer_link'>Home</li></Link> 
           <Link to="/Spells"><li className='footer_link'>Spells</li></Link>
           <Link to="/Maps"> <li className='footer_link'>Maps</li></Link>
        </ul>
        <p>&copy; Elisandro Sams 2026 </p>
    </div>
  )
}

export default Footer