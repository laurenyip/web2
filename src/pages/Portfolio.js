import React, { useState } from "react";
import "./Portfolio.css";
import { Link } from "react-router-dom";

function Portfolio() {
  // Array to manage the flip state of each card
  const [flippedCards, setFlippedCards] = useState([false, false, false, false, false]);

  const handleCardClick = (index) => {
    setFlippedCards(prevState => 
      prevState.map((flipped, i) => (i === index ? !flipped : flipped))
    );
  };

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
    <div className="Portfolio">
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

      <div className="container">
        <h1 className="text-left">Portfolio</h1>
        <br />
        <div className="card-container">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`card ${flippedCards[index] ? 'is-flipped' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card__inner">
                <div className="card__face card__face--front">
                  <img src={card.imgSrc} alt={card.title} width="100%" />
                </div>
                <div className="card__face card__face--back">
                  <div className="card__content">
                    <div className="card__body">
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
