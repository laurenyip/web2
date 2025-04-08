import React from 'react'
import './App.css'
import Navbar from '../components/Navbar'

function Projects() {
  const projects = [
    {
      title: 'Brig.AI',
      link: 'https://www.linkedin.com/posts/lauren-yip_ai4goodlab-activity-7214685350546276352-jnh0?utm_source=share&utm_medium=member_desktop',
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
      link: 'https://www.linkedin.com/posts/lauren-yip_%F0%9D%90%92%F0%9D%90%AE%F0%9D%90%A9%F0%9D%90%9E%F0%9D%90%AB-%F0%9D%90%9E%F0%9D%90%B1%F0%9D%90%9C%F0%9D%90%A2%F0%9D%90%AD%F0%9D%90%A2%F0%9D%90%A7%F0%9D%90%A0-%F0%9D%90%A9%F0%9D%90%A8%F0%9D%90%AC%F0%9D%90%AD-activity-7305352139243929601-_6gj',
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
      image: '/images/projects/bch.jpg',
    },
    {
      title: 'WiCS',
      link: 'https://www.linkedin.com/feed/update/urn:li:activity:7304615915566874624?updateEntityUrn=urn%3Ali%3Afs_updateV2%3A%28urn%3Ali%3Aactivity%3A7304615915566874624%2CFEED_DETAIL%2CEMPTY%2CDEFAULT%2Cfalse%29&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bga5FoYxFTMW1ZaKJmD1Brw%3D%3D',
      description: 'Technical Events Coordinator 2024-25, Organizing team and panelist for Try/CATCH 2024 and Networking Night 2025, Mentorship program',
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
      link: 'https://www.linkedin.com/in/lauren-yip/',
      description: 'Coming soon... message me to do a project together!',
      image: '/images/projects/placeholder.jpg',
    },
  ]

  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />

      {/* Desktop Layout - same as before */}
      <div className="hidden md:block pt-20">
        {/* Top Left Grid */}
        <div className="absolute top-[40%] left-[28%] transform -translate-x-1/4 -translate-y-1/4 w-[25%]">
          <div className="grid grid-cols-2 gap-6">
            {projects.slice(4, 8).map((project, index) => (
              <ProjectCard key={`bottom-${index}`} project={project} />
            ))}
          </div>
          {/* Projects Title */}
          <div
            className="mt-20 left-[5%] md:left-[20%] text-5xl md:text-8xl text-gray-700"
            style={{ fontFamily: "'Melo', sans-serif" }}
          >
            Projects
          </div>
        </div>

        {/* Bottom Right Grid */}
        <div className="absolute bottom-[15%] right-1/4 transform translate-x-1/4 translate-y-1/4 w-[25%]">
          {/* Experiences Title */}
          <div
            className="mb-20 md:right-[20%] right-[15%] bottom-[5%] text-5xl md:text-8xl text-gray-700"
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

      {/* Mobile Layout */}
      <div className="block md:hidden pt-24 px-4 max-w-xl mx-auto text-center">
        {/* Top Grid (1x4) */}
        <div className="grid grid-cols-1 gap-6 mb-12">
          {projects.slice(0, 4).map((project, index) => (
            <ProjectCard key={`mobile-top-${index}`} project={project} />
          ))}
        </div>

        {/* Center Titles */}
        <div className="mb-10">
          <h2
            className="text-3xl text-gray-800 mb-2"
            style={{ fontFamily: "'Melo', sans-serif" }}
          >
            Projects
          </h2>
          <h3
            className="text-3xl text-gray-800"
            style={{ fontFamily: "'Melo', sans-serif" }}
          >
            Experiences
          </h3>
        </div>

        {/* Bottom Grid (1x4) */}
        <div className="grid grid-cols-1 gap-6 mt-6">
          {projects.slice(4, 8).map((project, index) => (
            <ProjectCard key={`mobile-bottom-${index}`} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

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
