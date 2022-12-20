import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux.hook';
import { logout } from '../../redux/authSlice';

import Logo from '../../assets/logo.webp';
import User from '../../assets/user.jpeg';

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
} from 'react-icons/fa';
import { MdOutlineLogout } from 'react-icons/md';

function Sidebar() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="md:left-0 md:flex-col md:min-w-64 md:w-64 md:top-0 md:bottom-0 md:overflow-y-auto md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between py-2 px-6">
      <div className="w-full">
        <Link
          to="/"
          className="md:block md:pb-2 text-blue-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-2 px-0"
        >
          <img src={Logo} alt="Webgo Agency logo" width={150} height={68} className="mx-auto" />
        </Link>
        <hr className="my-4 md:min-w-full" />
      </div>

      <nav className="grow flex flex-col justify-between">
        <ul className="md:flex-col md:min-w-full flex flex-col list-none gap-1">
          <NavLink to="/">
            {({ isActive }) => (
              <li
                className={
                  'flex items-center text-xs uppercase py-3 font-bold px-4 rounded-md ' +
                  (isActive
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'text-blue-gray-800 hover:bg-blue-gray-100')
                }
              >
                <FaHome
                  className={'mr-2 text-xl ' + (!isActive ? 'opacity-75' : 'text-blueGray-300')}
                />
                <span>Tableau de bord</span>
              </li>
            )}
          </NavLink>
          <NavLink to="/prospects">
            {({ isActive }) => (
              <li
                className={
                  'flex items-center text-xs uppercase py-3 font-bold px-4 rounded-md ' +
                  (isActive
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'text-blue-gray-800 hover:bg-blue-gray-100')
                }
              >
                <FaUserTag
                  className={'mr-2 text-xl ' + (!isActive ? 'opacity-75' : 'text-blueGray-300')}
                />
                <span>Prospects</span>
              </li>
            )}
          </NavLink>
          <NavLink to="/clients">
            {({ isActive }) => (
              <li
                className={
                  'flex items-center text-xs uppercase py-3 font-bold px-4 rounded-md ' +
                  (isActive
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'text-blue-gray-800 hover:bg-blue-gray-100')
                }
              >
                <FaUserTie
                  className={'mr-2 text-xl ' + (!isActive ? 'opacity-75' : 'text-blueGray-300')}
                />
                <span>Clients</span>
              </li>
            )}
          </NavLink>
          <NavLink to="/planning">
            {({ isActive }) => (
              <li
                className={
                  'flex items-center text-xs uppercase py-3 font-bold px-4 rounded-md ' +
                  (isActive
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'text-blue-gray-800 hover:bg-blue-gray-100')
                }
              >
                <FaBusinessTime
                  className={'mr-2 text-xl ' + (!isActive ? 'opacity-75' : 'text-blueGray-300')}
                />
                <span>Planning</span>
              </li>
            )}
          </NavLink>
          <NavLink to="/projects">
            {({ isActive }) => (
              <li
                className={
                  'flex items-center text-xs uppercase py-3 font-bold px-4 rounded-md ' +
                  (isActive
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'text-blue-gray-800 hover:bg-blue-gray-100')
                }
              >
                <FaCode
                  className={'mr-2 text-xl ' + (!isActive ? 'opacity-75' : 'text-blueGray-300')}
                />
                <span>Projets</span>
              </li>
            )}
          </NavLink>
          <NavLink to="/estimation-invoice">
            {({ isActive }) => (
              <li
                className={
                  'flex items-center text-xs uppercase py-3 font-bold px-4 rounded-md ' +
                  (isActive
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'text-blue-gray-800 hover:bg-blue-gray-100')
                }
              >
                <FaFileInvoiceDollar
                  className={'mr-2 text-xl ' + (!isActive ? 'opacity-75' : 'text-blueGray-300')}
                />
                <span>Devis / Factures</span>
              </li>
            )}
          </NavLink>
          <NavLink to="/employees">
            {({ isActive }) => (
              <li
                className={
                  'flex items-center text-xs uppercase py-3 font-bold px-4 rounded-md ' +
                  (isActive
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'text-blue-gray-800 hover:bg-blue-gray-100')
                }
              >
                <FaUser
                  className={'mr-2 text-xl ' + (!isActive ? 'opacity-75' : 'text-blueGray-300')}
                />
                <span>Employés</span>
              </li>
            )}
          </NavLink>
          <hr className="my-4 md:min-w-full" />
        </ul>

        <div className="flex flex-col justify-center items-center gap-4">
          <img src={User} alt="..." width={100} />
          <div className="description text-center">
            <h3>Patrick Vongsa</h3>
            <p>Développeur Web</p>
          </div>
        </div>

        <ul className="md:flex-col md:min-w-full flex flex-col list-none gap-1">
          <hr className="my-4 md:min-w-full" />
          <NavLink to="/parameters">
            {({ isActive }) => (
              <li
                className={
                  'flex items-center text-xs uppercase py-3 font-bold px-4 rounded-md ' +
                  (isActive
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'text-blue-gray-800 hover:bg-blue-gray-100')
                }
              >
                <FaCog
                  className={'mr-2 text-xl ' + (!isActive ? 'opacity-75' : 'text-blueGray-300')}
                />
                <span>Paramètres</span>
              </li>
            )}
          </NavLink>
          <li
            className={
              'flex items-center text-xs uppercase py-3 font-bold px-4 cursor-pointer text-blue-gray-800 hover:bg-blue-gray-100 rounded-md'
            }
            onClick={handleLogout}
          >
            <MdOutlineLogout className={'mr-2 text-xl ' + 'opacity-75'} />
            <span>Se déconnecter</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
