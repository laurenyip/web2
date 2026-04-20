import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Portfolio from './pages/Portfolio'
import Writing from './pages/Writing'
import ReadingList from './pages/ReadingList'
import Spruce from './pages/portfolio/Spruce'
import Webring from './components/Webring'
import './index.css'
import './pages/App.css'

function App() {
  return (
    <Router>
      <div className='app-container flex min-h-screen flex-col'>
        <div className='flex min-h-0 w-full flex-1 flex-col'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/portfolio' element={<Portfolio />} />
            <Route path='/writing' element={<Writing />} />
            <Route path='/reading-list' element={<ReadingList />} />
            <Route path='/spruce' element={<Spruce />} />
          </Routes>
        </div>
        <Webring />
      </div>
    </Router>
  )
}

export default App