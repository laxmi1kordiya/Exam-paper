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
      <section className="section1">
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
      <Features />
      <Price />
      <HowToUse />
      <AboutUs />
      <Footer />
    </>
  );
};
export default Home;
