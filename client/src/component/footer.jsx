// // src/components/Footer.js
// import React from 'react';
// import { Box, Container, Typography, Link } from '@mui/material';
// import logo from '../images/logo.svg'
// import './Footer.css';

// const Footer = () => {
//   return (
//     <footer className="footer">
//     <div className="footer-content">
//       <div className="contact-info">
//       <Typography variant="body1" color="textSecondary" align="center">
//             <img src={logo} alt="" />
//           © {new Date().getFullYear()} Practicum
//         </Typography>
//       </div>
//     </div>
//   </footer>

//   );
// };

// export default Footer;
// src/components/Footer.js
import React from 'react';
import { Typography } from '@mui/material';
import logo from '../images/logo.svg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={logo} alt="Appsflyer Logo" className="footer-logo" />
        <Typography variant="body1" color="textSecondary" align="center" className="footer-text">
                 © {new Date().getFullYear()} Practicum
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;


