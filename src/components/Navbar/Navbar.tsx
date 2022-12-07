import React from 'react';
import {Link, NavLink} from "react-router-dom";

const INFO = ['Home', 'Info', 'Products', 'Contacts', 'About', 'Admin']

const Navbar: React.FC = () => {
  return (
    <div className="navbar navbar-expand navbar-dark bg-primary d-flex justify-content-between">
      <Link to={'/'} className="text-dark text-decoration-none">Static Pages</Link>
      <ul className="navbar-nav">
        {INFO.map((elem) => (
          <li className="nav-item" key={Math.random()}>
            <NavLink to={'/pages/' + elem.toLowerCase()} className="nav-link" key={Math.random()}>{elem}</NavLink>
          </li>
        ))}

      </ul>
    </div>
  );
};

export default Navbar;