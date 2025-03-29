import React, { useEffect, useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
  const aboutSlideIndexRef = useRef(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel data - using your existing sunrise images
  const carouselItems = [
    { image: "/images/about/sunrise/1.jpg", text: "Sunrise view 1" },
    { image: "/images/about/sunrise/2.jpg", text: "Sunrise view 2" },
    { image: "/images/about/sunrise/3.jpg", text: "Sunrise view 3" },
    { image: "/images/about/sunrise/4.jpg", text: "Sunrise view 4" },
    { image: "/images/about/sunrise/5.jpg", text: "Sunrise view 5" },
    { image: "/images/about/sunrise/6.jpg", text: "Sunrise view 6" }
  ];

  // Your existing functions remain unchanged
  const plusAboutSlides = (n) => {
    showAboutSlides((aboutSlideIndexRef.current += n));
  };

  const showAboutSlides = useCallback((n) => {
    const slides = document.getElementsByClassName("mySlides1");
    if (n > slides.length) {
      aboutSlideIndexRef.current = 1;
    }
    if (n < 1) {
      aboutSlideIndexRef.current = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[aboutSlideIndexRef.current - 1].style.display = "block";
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === carouselItems.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Your existing useEffect remains unchanged
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
      showAboutSlides(aboutSlideIndexRef.current);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [showAboutSlides]);

  return (
    <div className="About">
      {/* Everything above remains exactly the same */}
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
                src="/images/about/sunrise/1.jpg"
                alt="Sunrise 1"
                style={{ width: "63%" }}
              />
            </div>
            <div className="mySlides1">
              <img
                src="/images/about/sunrise/2.jpg"
                alt="Sunrise 2"
                style={{ width: "63%" }}
              />
            </div>
            <div className="mySlides1">
              <img
                src="/images/about/sunrise/3.jpg"
                alt="Sunrise 3"
                style={{ width: "63%" }}
              />
            </div>
            <div className="mySlides1">
              <img
                src="/images/about/sunrise/4.jpg"
                alt="Sunrise 4"
                style={{ width: "63%" }}
              />
            </div>
            <div className="mySlides1">
              <img
                src="/images/about/sunrise/5.jpg"
                alt="Sunrise 5"
                style={{ width: "63%" }}
              />
            </div>
            <div className="mySlides1">
              <img
                src="/images/about/sunrise/6.jpg"
                alt="Sunrise 6"
                style={{ width: "63%" }}
              />
            </div>

            <button className="nextA" onClick={() => plusAboutSlides(1)}>
              &#10095;
            </button>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="left-aligned">
            <p>
              Hi, my name is Lauren! I'm a 4th year Computer Science student at
              Simon Fraser University. my main professional interests are AI &
              Data Science, Visual & Interactive Computing + Design, and Product
              Management. I would love to apply my work to areas like ocean
              conservation & sustainability, or visual effects and animation :)
            </p>
            <p>
              I also love to read and write and paint in my spare time, and play the
              guitar and piano. I love exploring new places on long walks while
              travelling, and while I'm here, by hiking and swimming. (Currently
              working on my Open Water Diving certification!)
            </p>
            <p>My life goal is to collect as many new experiences as possible. I want to see the world and be present in each moment.
              I'm always looking for new opportunities to learn and grow, so
              feel free to reach out to me!</p>
          </div>
        </div>
      </div>

      {/* ONLY ADDITION: Simple Square Carousel - Added outside the container */}
      <div style={{
        margin: '40px 0',
        padding: '20px 0',
        backgroundColor: '#f8f9fa',
        width: '100%'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <h3 style={{ 
            textAlign: 'center', 
            marginBottom: '20px',
            fontFamily: 'inherit',
            fontWeight: 'normal',
            color: '#333'
          }}>More Moments</h3>
          
          <div style={{
            display: 'flex',
            overflow: 'hidden',
            justifyContent: 'center'
          }}>
            {carouselItems.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  width: '150px',
                  height: '150px',
                  margin: '0 10px',
                  position: 'relative',
                  flexShrink: 0,
                  transition: 'transform 0.3s',
                  transform: `translateX(${(idx - currentIndex) * 170}px)`
                }}
              >
                <img 
                  src={item.image} 
                  alt="" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }} 
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '8px',
                  textAlign: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  fontSize: '12px'
                }}>
                  {item.text}
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px'
          }}>
            {carouselItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  border: 'none',
                  margin: '0 5px',
                  backgroundColor: currentIndex === idx ? '#333' : '#ccc',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;