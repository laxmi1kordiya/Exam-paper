import React from "react";
import { BrowserRouter } from "react-router-dom"
import Navbar from "../frontend/Pages/Navbar"
import SignUp from "../frontend/Pages/SignUp";


const App = () => {
  return (
    <>
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <SignUp />
            {/* <Hero /> */}
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
