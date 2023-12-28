import React from 'react';
import '../../styles/Footer.css';
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { SiGeeksforgeeks } from "react-icons/si";
import { MdWork } from "react-icons/md";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (<>
  <hr />
    <div className="footer-basic">
      <footer>
        <div className="social">
          <Link to="https://ashutoshkportfolio.netlify.app/" target='_blank'><MdWork/></Link>
          <Link to="https://www.linkedin.com/in/ashutosh-khairnar-70ab151ba/" target='_blank'><FaLinkedinIn/></Link>
          <Link to="https://github.com/Ashutoshk2002" target='_blank'><FaGithub/></Link>
          <Link to="https://auth.geeksforgeeks.org/user/ashutoshkhairnar" target='_blank'><SiGeeksforgeeks/></Link>
        </div>
        <ul className="list-inline">
          <li className="list-inline-item"><Link to='/'>Home</Link></li>
          <li className="list-inline-item"><Link to='/about'>About</Link></li>
          <li className="list-inline-item"><Link to='/contact'>Contact</Link></li>
          <li className="list-inline-item"><Link to='/policy'>Privacy Policy</Link></li>
        </ul>
        <p className="copyright">All right Reserved &copy; Ashutosh</p>
      </footer>
    </div>


  </>
  )
}

export default Footer
