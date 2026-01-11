import React from "react";
import ReactDOM from "react-dom/client";
import { Showcase } from "./examples/Showcase";
import "./styles/liquid-glass.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Showcase />
  </React.StrictMode>,
);
