import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./SideBar";

function Layout({ children }) {
  return (
    <div className="d-flex">
      {/* Sidebar (Left) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}> {/* Adjusting for Sidebar width */}
        <Navbar />
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
