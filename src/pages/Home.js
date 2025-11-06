
import React from 'react'
import Navbar from '../components/Navbar'
import './App.css'
import resumePdf from './Resume___Lauren_Yip.pdf'


function Home() {
  return (
    <div className="App">
     
          <Navbar />
       
      
          <div className="containermain absolute top-[15%] left-1/2 -translate-x-1/2 px-4 w-full max-w-md md:left-[22%] md:translate-x-0">

        <p3>YIP/LAUREN宝怡</p3>
        <br></br>
        <br></br>
        <p3>the website &nbsp; 09FEB 2003</p3>
        <br></br>
        <p2>FM</p2>
        <p3>&nbsp;&nbsp;VANCOUVER/YVR</p3>
        <br></br> <p2>TO</p2>
        <p3>&nbsp;&nbsp;THEWORLD/!!!</p3>
        <br></br>
        <br></br>
        <br></br>
        <p2>
          &nbsp;&nbsp;Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Status
          @ SFU
        </p2>
        <br></br> <p3b>22A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YEAR4</p3b>
        <br></br>
        <p3>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a href={resumePdf} target="_blank" rel="noopener noreferrer">
            RESUME
          </a>
        </p3>
        <br></br>
        <p2>laurenyip20@gmail.com --- linkedin.com/in/lauren-yip</p2>
      </div>
    </div>
  )
}

export default Home
