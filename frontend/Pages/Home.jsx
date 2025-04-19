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
      <section id="home" className="section1">
        <div>
          <span>Generate Exams Papers For GSEB Board</span>
          <span>
            We Provide users to generate exam paper with many plans. you can
            also register as Teachers , Students , Schools , and Classes.
          </span>
        </div>
        <div className="img">
          <img src={iphoneImage} alt="Error" />
        </div>
      </section>

      <section id="features" className="section1">
        <Features />
      </section>

      <section id="packages" className="section1">
        <Price />
      </section>

      <section id="how-to-use" className="section1">
        <HowToUse />
      </section>

      <section id="about" className="section1">
        <AboutUs />
      </section>

      <a href="#" class="scroll-to-top">
        &#8679;
      </a>

      <Footer />
    </>
  );
};
export default Home;
