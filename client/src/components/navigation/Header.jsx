import React from 'react';
import {Link} from "react-router-dom";
import SideNav from "./SideNav";

const Header = () => {
   return (
	  <>
		 <nav className="navbar fixed-top">
			<Link to="/" className="navbar-brand d-flex align-items-center fredoka_ff">
			   MOVIES
			</Link>
			<SideNav/>
		 </nav>
	  </>
   );
};

export default Header;
