import React from "react";
import ReactDOM from "react-dom/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"; // Import HTML5Backend
import App from "./App.jsx";
import "../src/styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}> {/* Pass HTML5Backend here */}
      <App />
    </DndProvider>
  </React.StrictMode>
);