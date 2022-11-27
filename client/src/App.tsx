import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Layout from "./components/Layout.component";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Layout>
        <p>Test</p>
      </Layout>
    </div>
  );
}

export default App;
