import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import './index.css'
import './pages/App.css'

const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Writing = lazy(() => import('./pages/Writing'))

function App() {
  return (
    <Router>
      <div className="app-container">
        <Suspense fallback={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', fontFamily: 'system-ui' }}>Loading...</div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/writing" element={<Writing />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
