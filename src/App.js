import React from 'react'
import Home from './pages/Home'
import Webring from './components/Webring'
import './index.css'
import './pages/App.css'

function App() {
  return (
    <div className='app-container flex min-h-screen flex-col'>
      <div className='flex min-h-0 w-full flex-1 flex-col'>
        <Home />
      </div>
      <Webring />
    </div>
  )
}

export default App