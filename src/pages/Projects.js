import React from 'react'
import { Link } from 'react-router-dom'

function Projects() {
  const projects = [
    {
      title: 'Brig.AI',
      link: 'https://github.com/laurenyip/ai4good',
      description: 'Health tech for PCOS/Endometriosis',
      image: '/images/projects/ai4good.jpg',
    },
    {
      title: 'Emergency Response BC',
      link: 'https://devpost.com/software/emergency-response-bc-erbc',
      description: 'ER wait times webapp',
      image: '/images/projects/emergency.jpg',
    },
    {
      title: 'This Website!',
      link: 'laurenyip.com',
      description: 'Personal site redesign',
      image: '/images/projects/website.jpg',
    },
    {
      title: 'React to This!',
      link: 'https://rosielab.github.io/react-to-this/',
      description: 'VR research project',
      image: '/images/projects/react.jpg',
    },
  ]

  return (
    <div className="min-h-screen bg-white relative">
      {/* Fixed Navbar at top */}
      <nav className="fixed top-0 left-0 right-0 py-4 bg-white z-10">
        <div className="flex justify-center">
          <ul className="flex space-x-4" style={{ marginLeft: '25%' }}>
            <li>
              <Link to="/" className="text-sm hover:underline">
                Home |
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm hover:underline">
                About |
              </Link>
            </li>
            <li>
              <Link to="/projects" className="text-sm hover:underline">
                Projects |
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="text-sm hover:underline">
                Portfolio
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main content with top padding to account for fixed navbar */}
      <div className="pt-20">
        {/* Top Left Grid - shifted down by 15% */}
        <div className="absolute top-[30%] left-1/4 transform -translate-x-1/4 -translate-y-1/4 w-1/4">
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <ProjectCard key={`top-${index}`} project={project} />
            ))}
          </div>
          {/* "Projects" text directly below */}
          <div
            className="mt-16 text-left text-8xl text-gray-700"
            style={{ fontFamily: "'Melo', sans-serif" }}
          >
            Projects
          </div>
        </div>

        {/* Bottom Right Grid - shifted down by 15% */}
        <div className="absolute bottom-[20%] right-1/4 transform translate-x-1/4 translate-y-1/4 w-1/4">
          {/* "Experiences" text directly above */}
          <div
            className="mb-16 text-right text-8xl text-gray-700"
            style={{ fontFamily: "'Melo', sans-serif" }}
          >
            Experiences
          </div>
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <ProjectCard key={`bottom-${index}`} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Project Card Component (unchanged)
function ProjectCard({ project }) {
  return (
    <div className="group relative aspect-square w-full rounded-lg shadow-md overflow-hidden cursor-pointer">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${project.image})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-opacity duration-300"></div>
      </div>

      <div className="absolute inset-0 flex items-end p-3">
        <h3 className="text-white text-sm font-medium z-10">{project.title}</h3>
      </div>

      <div className="absolute inset-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center bg-black bg-opacity-70">
        <p className="text-white text-xs mb-2">{project.description}</p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-1 bg-white text-gray-800 rounded text-xs hover:bg-gray-200 transition-colors"
        >
          View
        </a>
      </div>
    </div>
  )
}

export default Projects