import React from "react";
import "./App.css";
import { StateContext } from "./context/StateContext";
import Routes from "./routes";

function App() {
  return (
    <div className="App">
      <StateContext>
        <Routes />
      </StateContext>
    </div>
  );
}

export default App;
