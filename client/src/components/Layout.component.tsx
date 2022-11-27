import Sidebar from "./sidebar/Sidebar.component";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
