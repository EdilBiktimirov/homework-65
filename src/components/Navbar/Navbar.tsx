import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {Dropdown} from "react-bootstrap";

interface Props {
  pages: string [];
}

const Navbar: React.FC<Props> = ({pages}) => {
  const newPages = pages.filter(item => item !== 'home');

  return (
    <div className="navbar navbar-expand navbar-dark bg-info d-flex justify-content-between px-2">
      <Link to={'/'} className="text-dark text-decoration-none">Static Pages</Link>
      <ul className="navbar-nav">
        {newPages !== null && (
          newPages.map((elem) => (
            <li className="nav-item" key={Math.random()}>
              <NavLink
                to={'/pages/' + elem.toLowerCase()}
                className="nav-link" key={Math.random()}
              >
                {elem.toUpperCase()}
              </NavLink>
            </li>
          ))
        )}
        <Dropdown>
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            Admin
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Link to={'/pages/admin'} className="nav-link text-dark">Edit page</Link>
            <Link to={'/pages/add-page'} className="nav-link text-dark">Add page</Link>
          </Dropdown.Menu>
        </Dropdown>
      </ul>
    </div>
  );
};

export default Navbar;