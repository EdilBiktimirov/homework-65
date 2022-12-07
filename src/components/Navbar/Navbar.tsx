import React from 'react';
import {Link, NavLink} from "react-router-dom";

const INFO = ['Home', 'Info', 'Products', 'Contacts', 'About', 'Admin']

const Navbar: React.FC = () => {
  return (
    <div className="navbar navbar-expand navbar-dark bg-primary d-flex justify-content-between">
      <Link to={'/'} className="text-danger text-decoration-none">Static Pages</Link>
      <ul className="navbar-nav">
        {INFO.map((elem) => (
          <li className="nav-item" key={Math.random()}>
            <NavLink to={'/pages/' + elem.toLowerCase()} className="nav-link" key={Math.random()}>{elem}</NavLink>
          </li>
        ))}
        {/*<li className="nav-item">*/}
        {/*  <NavLink to={'/pages/' + } className="nav-link">Home</NavLink>*/}
        {/*</li>*/}
        {/*<li className="nav-item">*/}
        {/*  <NavLink to={'/info'} className="nav-link">Info</NavLink>*/}
        {/*</li>*/}
        {/*<li className="nav-item">*/}
        {/*  <NavLink to={'/products'} className="nav-link">Products</NavLink>*/}
        {/*</li>*/}
        {/*<li className="nav-item">*/}
        {/*  <NavLink to={'/contacts'} className="nav-link">Contacts</NavLink>*/}
        {/*</li>*/}
        {/*<li className="nav-item">*/}
        {/*  <NavLink to={'/about'} className="nav-link">About</NavLink>*/}
        {/*</li>*/}
        {/*<li className="nav-item">*/}
        {/*  <NavLink to={'/admin'}  className="nav-link">Admin</NavLink>*/}
        {/*</li>*/}

      </ul>
    </div>
  );
};

export default Navbar;