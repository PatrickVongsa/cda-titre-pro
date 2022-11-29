import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar.component";

const Layout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Layout;
