import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
export default function Layout() {
  return (
    <>
      <div className="app">
      <NavBar />
      <div id="MainLayout" className="container mx-auto  ">
      <Outlet />
      </div>
     
      <Footer />
      </div>
  
    </>
  );
}
