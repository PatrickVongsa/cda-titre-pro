import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout.component";

import Dashboard from "./pages/Dashboard.page";
import Prospect from "./pages/Prospect.page";
import Client from "./pages/Client.page";
import Contact from "./pages/Contact.page";
import Planning from "./pages/Planning.page";
import Project from "./pages/Project.page";
import Invoice from "./pages/Invoice.page";
import Parameters from "./pages/Parameters.page";
import NoMatch from "./pages/404.page";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="prospects" element={<Prospect />} />
          <Route path="clients" element={<Client />} />
          <Route path="contacts" element={<Contact />} />
          <Route path="evenements" element={<Planning />} />
          <Route path="opportunites" element={<Project />} />
          <Route path="estimation-invoice" element={<Invoice />} />
          <Route path="parameters" element={<Parameters />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
