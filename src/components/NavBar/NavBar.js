import * as React from 'react';
import { Link } from 'react-router-dom';

import { CardHeaderTypography } from '../StyledComponents/StyledComponents';
// import { styles } from '../styles/customTheme';
import './NavBar.css'

const NavBar = () => (
  <div className='navbar-container'>
    <Link
      to={"/team"}
      style={{ textDecoration: 'none' }}
    ><CardHeaderTypography>Team</CardHeaderTypography></Link>
    <Link
      to={"/about"}
      style={{ textDecoration: 'none' }}
    ><CardHeaderTypography>About</CardHeaderTypography></Link>
  </div>
);

export default NavBar;
// export default withStyles(styles)(NavBar);
