import React from 'react';
import logo from '../images/logo.png';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="ABC Institute" width="100" height="100" />
          <span className="fs-1 ms-1">ABC Institute</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link btn btn-outline-primary btn-lg fw-bold mx-4" href="/students">Students</a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn btn-outline-primary btn-lg fw-bold mx-4" href="/programs">Programs</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
