import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import '../components/Navbar.css'
import Navbar from '../components/Navbar'

function Projects() {
  const projects = [
    {
      title: 'Brig.AI',
      link: 'https://www.linkedin.com/posts/lauren-yip_ai4goodlab-activity-7214685350546276352-jnh0?utm_source=share&utm_medium=member_desktop&rcm=ACoAACyz3KoB4I2e1afxgO2P1KYhFYW3VHS337Y',
      description: 'Health tech for PCOS/Endometriosis',
      image: '/images/projects/ai4.jpg',
    },
    {
      title: 'Emergency Response BC',
      link: 'https://devpost.com/software/emergency-response-bc-erbc',
      description: 'ER wait times webapp',
      image: '/images/projects/landing.png',
    },
    {
      title: 'PRD+',
      link: 'https://www.linkedin.com/posts/lauren-yip_%F0%9D%90%92%F0%9D%90%AE%F0%9D%90%A9%F0%9D%90%9E%F0%9D%90%AB-%F0%9D%90%9E%F0%9D%90%B1%F0%9D%90%9C%F0%9D%90%A2%F0%9D%90%AD%F0%9D%90%A2%F0%9D%90%A7%F0%9D%90%A0-%F0%9D%90%A9%F0%9D%90%A8%F0%9D%90%AC%F0%9D%90%AD-activity-7305352139243929601-_6gj?utm_source=share&utm_medium=member_desktop&rcm=ACoAACyz3KoB4I2e1afxgO2P1KYhFYW3VHS337Ym',
      description: "UBC PMC's Product Sprint, 1st Place",
      image: '/images/projects/prd.jpg',
    },
    {
      title: 'React to This!',
      link: 'https://rosielab.github.io/react-to-this/',
      description: 'Research assistantship with ROSIE Lab',
      image: './images/Rosie/elan.png',
    },
    {
      title: 'BC Hydro',
      link: '#',
      description: 'IT Cybersecurity Infrastructure and Platforms Intern',
      image: '/images/projects/bch.png',
    },
    {
      title: 'WiCS',
      link: '#',
      description: 'Coming soon',
      image: '/images/projects/wics.jpg',
    },
    {
      title: 'Community!',
      link: '#',
      description: 'Hackathon judge at Fall Hacks 2024, judge + workshop host at XD Hacks 2025',
      image: '/images/projects/placeholder.jpg',
    },
    {
      title: 'Project 8',
      link: '#',
      description: 'Coming soon',
      image: '/images/projects/placeholder.jpg',
    },
  ]

  return (
    <div className="min-h-screen bg-white relative">
     
          <Navbar />
       
      {/* Main content with top padding to account for fixed navbar */}
      <div className="pt-20">
        {/* Top Left Grid - shifted down by 15% */}
        <div className="absolute top-[40%] left-[28%] transform -translate-x-1/4 -translate-y-1/4 w-[25%]">
          <div className="grid grid-cols-2 gap-6">
          {projects.slice(4, 8).map((project, index) => (
              <ProjectCard key={`bottom-${index}`} project={project} />
            ))}
          </div>
          {/* "Projects" text directly below */}
          <div
            className="mt-20 text-left text-8xl text-gray-700"
            style={{ fontFamily: "'Melo', sans-serif" }}
          >
            Projects
          </div>
        </div>

        {/* Bottom Right Grid - shifted down by 15% */}
        <div className="absolute bottom-[15%] right-1/4 transform translate-x-1/4 translate-y-1/4 w-[25%]">
          {/* "Experiences" text directly above */}
          <div
            className="mb-20 text-right text-8xl text-gray-700"
            style={{ fontFamily: "'Melo', sans-serif" }}
          >
            Experiences
          </div>
          <div className="grid grid-cols-2 gap-6">
            {projects.slice(0, 4).map((project, index) => (
              <ProjectCard key={`bottom-${index}`} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Project Card Component
function ProjectCard({ project }) {
  return (
    <div className="group relative aspect-square w-full rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${project.image})` }}
      >
        <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-20 transition-opacity duration-300"></div>
      </div>

      <div className="absolute inset-0 flex items-end p-4">
        <h3 className="text-white text-sm font-medium z-10">{project.title}</h3>
      </div>

      <div className="absolute inset-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center bg-black bg-opacity-70">
        <p className="text-white text-xs mb-3">{project.description}</p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 bg-white text-gray-800 rounded text-xs hover:bg-gray-200 transition-colors"
        >
          View
        </a>
      </div>
    </div>
  )
}

export default Projects