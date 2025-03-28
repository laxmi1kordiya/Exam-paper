import React from "react";
import { BrowserRouter } from "react-router-dom"
import Home from "../frontend/Pages/Home/Home";
import Navbar from "../frontend/Pages/Navbar"


const App = () => {
  return (
    <>
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Home />
          </div>
          {/* <About />
          <Education />
          <Experience />
          <Tech />
          <Works /> */}
          {/* <Feedbacks /> */}
          {/* <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div> */}
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
