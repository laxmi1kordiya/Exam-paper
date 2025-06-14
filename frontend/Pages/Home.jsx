import React, { useState, useEffect } from "react";
import Features from "./Features";
import Price from "./Price";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import HowToUse from "./HowToUse";
import Navbar from "./Navbar";
import { iphoneImage } from "../Assets";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <main>
        <section id="home" className="hero-section">
          <div className="hero-content">
            <h1>Create Exam Papers for GSEB Board</h1>
            <p>
              We Provide users to design and generate customized exam papers
              for the GSEB Board Whether you're a teacher, student, school, or
              managing multiple classes.
            </p>
            <div className="hero-cta">
              <Link to="/signUp" className="cta-button primary">Get Started</Link>
              <ScrollLink
                to="how-to-use"
                smooth={true}
                duration={500}
                offset={-70}
                className="cta-button secondary"
              >
                Learn More
              </ScrollLink>
            </div>
          </div>
          <div className="hero-image">
            <img src={iphoneImage} alt="Exam Paper App Preview" />
          </div>
        </section>

        <section id="features" className="section">
          <Features />
        </section>

        <section id="packages" className="section">
          <Price />
        </section>

        <section id="how-to-use" className="section">
          <HowToUse />
        </section>

        <section id="about" className="section">
          <AboutUs />
        </section>
      </main>

      {showScrollTop && (
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="arrow">↑</span>
        </button>
      )}

      <Footer />
    </div>
  );
};

export default Home;
