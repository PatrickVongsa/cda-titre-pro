import { useState } from "react";

import "./sidebar.styles.css";

import Logo from "../../assets/logo.webp";
import User from '../../assets/user.jpeg'

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
          <li className="nav-item active">
            <FaHome />
            <span>Tableau de bord</span>
          </li>
          <li className="nav-item">
            <FaUserTag />
            <span>Prospects</span>
          </li>
          <li className="nav-item">
            <FaUserTie />
            <span>Clients</span>
          </li>
          <li className="nav-item">
            <FaBusinessTime />
            <span>Planning</span>
          </li>
          <li className="nav-item">
            <FaCode />
            <span>Projets</span>
          </li>
          <li className="nav-item">
            <FaFileInvoiceDollar />
            <span>Devis / Factures</span>
          </li>
          <li className="nav-item">
            <FaUser />
            <span>Employés</span>
          </li>
        </ul>

        <hr />

        <div className="user">
          <img src={User} alt="..." />
          <h3>Patrick Vongsa</h3>
        </div>

        <hr />

        <ul>
          <li className="nav-item">
            <FaCog />
            <span>Paramètres</span>
          </li>
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
