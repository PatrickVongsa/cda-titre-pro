import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux.hook';
import Sidebar from './sidebar/Sidebar.component';

const Layout = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Layout;
