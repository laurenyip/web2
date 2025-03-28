import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Portfolio() {
  const [currentImage, setCurrentImage] = useState(null);
  const [currentDescription, setCurrentDescription] = useState("");

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setCurrentImage(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const cardData = [
    {
      imgSrc: "/images/portfolio/lily.png",
      description: "dedicated to my friends -- 2021-08"
    },
    {
      imgSrc: "/images/portfolio/dance.png",
      description: "winter, dancing - 2021-01"
    },
    {
      imgSrc: "/images/portfolio/backy.png",
      description: "my backyard - 2022"
    },
    {
      imgSrc: "/images/portfolio/tidepool.png",
      description: "a belcarra tidepool - 2022-02"
    },
    {
      imgSrc: "/images/portfolio/blue.png",
      description: "blue hydrangeas flower meaning: forgiveness, gratitude, heartfelt emotion - 2021-07"
    },
    {
      imgSrc: "/images/portfolio/ten.jpg",
      description: "10 things i hate about u - 2025-01"
    }
  ];

  const handleImageClick = (imgSrc, description) => {
    setCurrentImage(imgSrc);
    setCurrentDescription(description);
  };

  return (
    <div className="bg-white">
      <ul className="navbar">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home |
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/About">
            About |
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Projects">
            Projects |
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Portfolio">
            Portfolio
          </Link>
        </li>
      </ul>

      <div className="w-full mx-auto max-w-xl flex flex-col lg:h-svh justify-center py-12 lg:py-24 relative p-8">
        <div className="prose text-gray-500 prose-sm prose-headings:font-normal prose-headings:text-xl">
          <div>
            <h1>Paintings</h1>
            <p className="text-balance">
              Click on any image to view it in full screen
            </p>
          </div>
        </div>

        {/* Substack button */}
        <div className="flex justify-center my-6">
          <a 
            href="https://alyssasong.substack.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-full bg-[#ffc2c2] px-8 py-2 text-sm font-semibold text-[#0a085d] hover:bg-[#ffb2b2] focus:outline-none focus:ring-2 focus:ring-[#ffc2c2] focus:ring-offset-2"
          >
            Visit My Substack
          </a>
        </div>

        <div className="mt-6 border-t pt-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cardData.map((card, index) => (
              <div 
                key={index}
                onClick={() => handleImageClick(card.imgSrc, card.description)}
                className="cursor-pointer"
              >
                <img 
                  src={card.imgSrc} 
                  alt={`Portfolio image ${index + 1}`}
                  className="w-full h-auto aspect-[3/4] object-cover"
                />
              </div>
            ))}
          </div>

          {/* Modal with large image display */}
          {currentImage && (
            <div 
              className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-80 transition-opacity duration-300 z-50" 
              onClick={() => setCurrentImage(null)}
            >
              <div 
                className="max-w-[100%] max-h-[100%] overflow-auto py-8"
                onClick={e => e.stopPropagation()}
              >
                <div className="prose text-gray-500 mx-auto prose-sm prose-headings:font-normal prose-headings:text-xl">
                  <div className="text-center max-w-sm mx-auto">
                    <h1>{currentDescription}</h1>
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentImage(null)}
                  className="rounded-full bg-[#ffc2c2] px-8 py-2 h-12 text-sm font-semibold flex items-center text-[#0a085d] hover:bg-[#ffb2b2] focus:outline-none focus:ring-2 focus:ring-[#ffc2c2] justify-center mx-auto w-auto focus:ring-offset-2 mt-4"
                >
                  Close
                </button>
                <div className="flex justify-center mt-8">
                  <img 
                    src={currentImage} 
                    alt="Full Size Image" 
                    className="max-w-[150vw] max-h-[120vh] object-contain"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;