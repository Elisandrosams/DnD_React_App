import React from 'react'
import Logo from "../../Assets/Personal Logo.png";
import './Footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
window.scrollTo({
top: 0,
behavior: "smooth",
});
};
  return (
    <div className='footer'>
        <button onClick={scrollToTop}><img src={Logo} alt="Logo" className='footer_logo' /></button>
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