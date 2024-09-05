// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Add your global styles
import Home from './pages/Home'; // Import the Home component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use Routes and Route instead of Switch

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Use element to render the component */}
        {/* Add other routes here */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
