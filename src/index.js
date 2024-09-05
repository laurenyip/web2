// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Global styles
import Home from "./pages/Home"; // Import the Home component
import About from "./pages/About"; // Import the About component
import Projects from "./pages/Projects"; // Import the Projects component
import Portfolio from "./pages/Portfolio"; // Import the Portfolio component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use Routes and Route

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/about" element={<About />} /> {/* About route */}
        <Route path="/projects" element={<Projects />} /> {/* Projects route */}
        <Route path="/portfolio" element={<Portfolio />} />{" "}
        {/* Portfolio route */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
