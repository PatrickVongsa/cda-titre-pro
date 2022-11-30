import { useState } from "react";
import { NavLink } from "react-router-dom";

import "./sidebar.styles.css";

import Logo from "../../assets/logo.webp";
import User from "../../assets/user.jpeg";

import {
  FaAngleRight,
  FaHome,
  FaUserTag,
  FaUserTie,
  FaCode,
  FaUser,
  FaBusinessTime,
  FaFileInvoiceDollar,
  FaCog,
} from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`sidebar ${open ? "open" : ""}`}>
      <div className="logo">
        <img src={Logo} alt="Webgo Agency logo" />
      </div>

      <hr />

      <div className="toggle" onClick={() => setOpen(!open)}>
        <FaAngleRight />
      </div>

      <nav>
        <ul>
          <NavLink to="/">
            {({ isActive }) => (
              <li className={`nav-item ${isActive ? "active" : ""}`}>
                <FaHome />
                <span>Tableau de bord</span>
              </li>
            )}
          </NavLink>
          <NavLink to="/prospects">
            {({ isActive }) => (
              <li className={`nav-item ${isActive ? "active" : ""}`}>
              <FaUserTag />
              <span>Prospects</span>
            </li>
            )}
          </NavLink>
          <NavLink to="/clients">
            {({ isActive }) => (
              <li className={`nav-item ${isActive ? "active" : ""}`}>
              <FaUserTie />
              <span>Clients</span>
            </li>
            )}
          </NavLink>
          <NavLink to="/planning">
            {({ isActive }) => (
              <li className={`nav-item ${isActive ? "active" : ""}`}>
              <FaBusinessTime />
              <span>Planning</span>
            </li>
            )}
          </NavLink>
          <NavLink to="/projects">
          {({ isActive }) => (
            <li className={`nav-item ${isActive ? "active" : ""}`}>
              <FaCode />
              <span>Projets</span>
            </li>
            )}
          </NavLink>
          <NavLink to="/estimation-invoice">
          {({ isActive }) => (
            <li className={`nav-item ${isActive ? "active" : ""}`}>
              <FaFileInvoiceDollar />
              <span>Devis / Factures</span>
            </li>
            )}
          </NavLink>
          <NavLink to="/employees">
          {({ isActive }) => (
            <li className={`nav-item ${isActive ? "active" : ""}`}>
              <FaUser />
              <span>Employés</span>
            </li>
            )}
          </NavLink>
        </ul>

        <hr />

        <div className="user">
          <img src={User} alt="..." />
          <div className="description">
            <h3>Patrick Vongsa</h3>
            <p>Développeur Web</p>
          </div>
        </div>

        <hr />

        <ul>
          <NavLink to="/parameters">
            {({ isActive }) => (
              <li className={`nav-item ${isActive ? "active" : ""}`}>
              <FaCog />
              <span>Paramètres</span>
            </li>
            )}
          </NavLink>
          <li className="nav-item">
            <MdOutlineLogout />
            <span>Se déconnecter</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
