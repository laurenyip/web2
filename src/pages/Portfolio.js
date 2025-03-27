import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Portfolio() {
  const [currentImage, setCurrentImage] = useState(null);

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
      description: "dedicated to my friends - 2021-08"
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

  return (
    <div className="bg-white">
      <ul className="bg-white text-[#0a085d] font-['Moto'] opacity-70 p-[2%] mt-[1%] z-10 text-lg flex list-none justify-start">
        <li className="mr-[10px]">
          <Link className="no-underline text-inherit" to="/">
            Home |
          </Link>
        </li>
        <li className="mr-[10px]">
          <Link className="no-underline text-inherit" to="/About">
            About |
          </Link>
        </li>
        <li className="mr-[10px]">
          <Link className="no-underline text-inherit" to="/Projects">
            Projects |
          </Link>
        </li>
        <li>
          <Link className="no-underline text-inherit" to="/Portfolio">
            Portfolio
          </Link>
        </li>
      </ul>

      <div className="w-full mx-auto max-w-xl flex flex-col lg:h-svh justify-center py-24 lg:py-96 relative p-8">
        <div className="prose text-gray-500 prose-sm prose-headings:font-normal prose-headings:text-xl">
          <div>
            <h1>Portfolio</h1>
            <p className="text-balance">
              Click on the image to view it in full screen and click outside the
              image or press ESC to close it.
            </p>
          </div>
        </div>

        <div className="mt-6 border-t pt-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cardData.map((card, index) => (
              <div 
                key={index}
                onClick={() => setCurrentImage(card.imgSrc)}
                className="cursor-pointer"
              >
                <img 
                  src={card.imgSrc} 
                  alt={`Portfolio image ${index + 1}`}
                  className="w-full h-auto aspect-[3/4] object-cover"
                />
                <p className="text-sm text-gray-600 mt-2">{card.description}</p>
              </div>
            ))}
          </div>

          {/* Modal */}
          {currentImage && (
            <div 
              className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-80 transition-opacity duration-300" 
              role="dialog" 
              aria-modal="true"
              onClick={() => setCurrentImage(null)}
            >
              <div 
                className="max-w-full max-h-full overflow-auto py-12"
                onClick={e => e.stopPropagation()}
              >
                <div className="prose text-gray-500 mx-auto prose-sm prose-headings:font-normal prose-headings:text-xl">
                  <div className="text-center max-w-sm mx-auto">
                    <h1>Image Details</h1>
                    <p className="text-balance">
                      To close the modal, click outside the modal, press ESC, or
                      click the close button.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentImage(null)}
                  className="rounded-full bg-[#ffc2c2] px-8 py-2 h-12 text-sm font-semibold flex items-center text-[#0a085d] hover:bg-[#ffb2b2] focus:outline-none focus:ring-2 focus:ring-[#ffc2c2] justify-center mx-auto w-auto focus:ring-offset-2"
                >
                  Close
                </button>
                <img 
                  src={currentImage} 
                  alt="Full Size Image" 
                  className="max-w-full max-h-full mx-auto mt-12"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
