import React, { useEffect } from "react";
import "./About.css";
import { Link } from "react-router-dom";

function About() {
  let aboutSlideIndex = 1;

  const plusAboutSlides = (n) => {
    showAboutSlides((aboutSlideIndex += n));
  };

  const showAboutSlides = (n) => {
    const slides = document.getElementsByClassName("mySlides1");
    if (n > slides.length) {
      aboutSlideIndex = 1;
    }
    if (n < 1) {
      aboutSlideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[aboutSlideIndex - 1].style.display = "block";
  };

  useEffect(() => {
    const header = document.querySelector(".navbar");
  
    if (header) {
      const handleScroll = () => {
        const top = window.scrollY;
        if (top >= 0) {
          header.classList.add("navbarDark");
        } else {
          header.classList.remove("navbarDark");
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      // Initial display of slides
      showAboutSlides(aboutSlideIndex);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [aboutSlideIndex, showAboutSlides]); // Include the missing dependencies here
  

  return (
    <div className="About">
      <ul className="navbar">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home |
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">
            About |
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/projects">
            Projects |
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/portfolio">
            Portfolio
          </Link>
        </li>
      </ul>

      <div className="container">
        <h1 className="text-left">About Me</h1>
        <div className="row mt-3 about-content">
          <img
            src="/images/about/green.png"
            className="imageAboutPage"
            alt="Green"
            style={{ width: "30%" }}
          />

          <div id="aboutImageSlideshow" className="slideshow-container">
            <div className="mySlides1">
              <img
                src="images/about/sunrise/1.jpg"
                alt="Sunrise 1"
                style={{ width: "63%" }}
              />
            </div>
            <div className="mySlides1">
              <img
                src="images/about/sunrise/2.jpg"
                alt="Sunrise 2"
                style={{ width: "63%" }}
              />
            </div>
            <div className="mySlides1">
              <img
                src="images/about/sunrise/3.jpg"
                alt="Sunrise 3"
                style={{ width: "63%" }}
              />
            </div>
            <div className="mySlides1">
              <img
                src="images/about/sunrise/4.jpg"
                alt="Sunrise 4"
                style={{ width: "63%" }}
              />
            </div>
            <div className="mySlides1">
              <img
                src="images/about/sunrise/5.jpg"
                alt="Sunrise 5"
                style={{ width: "63%" }}
              />
            </div>
            <div className="mySlides1">
              <img
                src="images/about/sunrise/6.jpg"
                alt="Sunrise 6"
                style={{ width: "63%" }}
              />
            </div>

            {/* Next button */}
            <button className="nextA" onClick={() => plusAboutSlides(1)}>
              &#10095;
            </button>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="left-aligned">
            <p>
              Hi, my name is Lauren! I'm a 4th year Computer Science student at Simon Fraser University. 
              My technical interests include visual and interactive computing, Artificial Intelligence, and UI/UX design.
              I'm working on a portfolio of projects to improve my development and design skills.
            </p>
            <p>
              I also love to read and paint in my spare time, and play the guitar and piano. I love exploring new places on long walks while travelling, 
              and while I'm here, by hiking and swimming.
              (Currently working on my Open Water Diving certification!)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
