import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout.component';

import Dashboard from './pages/Dashboard.page';
import Prospect from './pages/Prospect.page';
import Client from './pages/Client.page';
import Contact from './pages/Contact.page';
import Planning from './pages/Planning.page';
import Project from './pages/Project.page';
import Invoice from './pages/Invoice.page';
import Parameters from './pages/Parameters.page';
import NoMatch from './pages/404.page';
import Employee from './pages/Employee.page';
import Login from './pages/Login.page';

function App() {
  return (
    <div className="flex flex-row w-screen h-screen overflow-hidden">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="prospects" element={<Prospect />} />
          <Route path="clients" element={<Client />} />
          <Route path="contacts" element={<Contact />} />
          <Route path="planning" element={<Planning />} />
          <Route path="projects" element={<Project />} />
          <Route path="employees" element={<Employee />} />
          <Route path="estimation-invoice" element={<Invoice />} />
          <Route path="parameters" element={<Parameters />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
