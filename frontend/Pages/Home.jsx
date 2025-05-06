import React from "react";
import Features from "./Features";
import Price from "./Price";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import HowToUse from "./HowToUse";
import Navbar from "./Navbar";
import { iphoneImage } from "../Assets";

const Home = () => {
  return (
    <>
      <Navbar />
        <div >
          <section id="home" className="section1">
            <div>
              <span>Create Exam Papers for GSEB Board</span>
              <span>
                We Provide users to design and generate customized exam papers
                for the GSEB Board Whether you're a teacher, student, school, or
                managing multiple classes.
              </span>
            </div>
            <div className="img">
              <img src={iphoneImage} alt="Error" />
            </div>
          </section>
        </div>
        <div className="main-content">
          <section id="features" className="section1">
            <Features />
          </section>
        </div>
        <div className="main-content">
          <section id="packages" className="section1">
            <Price />
          </section>
        </div>
        <div className="main-content">
          <section id="how-to-use" className="section1">
            <HowToUse />
          </section>
        </div>
        <div className="main-content">
          <section id="about" className="section1">
            <AboutUs />
          </section>
        </div>

        <a href="#">&#8679;</a>
      <Footer />
    </>
  );
};
export default Home;
