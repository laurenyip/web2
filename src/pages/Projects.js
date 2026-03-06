import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from '../components/Navbar'

function Projects() {
  const [openCaseStudy, setOpenCaseStudy] = useState(null)

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpenCaseStudy(null)
      }
    }
    if (openCaseStudy) {
      window.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [openCaseStudy])

  const projects = [
    {
      title: 'Brig.AI',
      link: 'https://www.linkedin.com/posts/lauren-yip_ai4goodlab-activity-7214685350546276352-jnh0?utm_source=share&utm_medium=member_desktop',
      description: 'Health tech for PCOS/Endometriosis',
      image: '/images/projects/ai4.jpg',
      hasCaseStudy: true,
    },
    {
      title: 'Spruce',
      link: 'https://devpost.com/software/spruce',
      description: "Finding third spaces for kids in Vancouver — =Best UI Design Award",
      image: '/images/projects/spruce.png',
      hasCaseStudy: true,
    },
    {
      title: 'PRD+',
      link: 'https://www.linkedin.com/posts/lauren-yip_%F0%9D%90%92%F0%9D%90%AE%F0%9D%90%A9%F0%9D%90%9E%F0%9D%90%AB-%F0%9D%90%9E%F0%9D%90%B1%F0%9D%90%9C%F0%9D%90%A2%F0%9D%90%AD%F0%9D%90%A2%F0%9D%90%A7%F0%9D%90%A0-%F0%9D%90%A9%F0%9D%90%A8%F0%9D%90%AC%F0%9D%90%AD-activity-7305352139243929601-_6gj',
      description: "UBC PMC's Product Sprint, 1st Place",
      image: '/images/projects/prd.jpg',
      hasCaseStudy: true,
    },
    {
      title: 'Community!',
      link: 'https://treehouse.place/',
      description: 'Designed the Treehouse Place website',
      image: '/images/projects/treehouse.png',
      hasCaseStudy: true,
    },
    {
      title: 'Canadian Space Agency',
      link: 'https://www.linkedin.com/feed/update/urn:li:activity:7348846522555342848/',
      description: 'Mission Science Apprentice',
      image: '/images/projects/csa.jpg',
    },
    {
      title: 'WiCS',
      link: 'https://www.linkedin.com/feed/update/urn:li:activity:7304615915566874624?updateEntityUrn=urn%3Ali%3Afs_updateV2%3A%28urn%3Ali%3Aactivity%3A7304615915566874624%2CFEED_DETAIL%2CEMPTY%2CDEFAULT%2Cfalse%29&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bga5FoYxFTMW1ZaKJmD1Brw%3D%3D',
      description: 'Technical Events Coordinator 2024-25, organizing team, panelist, mentor',
      image: '/images/projects/wics.jpg',
    },
    {
      title: 'React to This!',
      link: 'https://rosielab.github.io/react-to-this/',
      description: 'Research assistantship with ROSIE Lab',
      image: './images/Rosie/elan.png',
      hasCaseStudy: true,
    },
    {
      title: 'Simple Ventures',
      link: 'https://framer.com/projects/Aurora-Pet-Co--1Nqr9CaWcgbGtWCJijK3-2x9Gy',
      description: 'Cansbridge x SV pitch competition top 4, best design.',
      image: '/images/projects/sv.png',
      hasCaseStudy: true,
    },
    {
      title: 'jellyfish umbrella',
      link: '/rolypolyzine.pdf',
      description: 'zine',
      image: '/images/projects/jellyfish-umbrella.png',
      hasCaseStudy: true,
    },
    {
      title: 'The Lyre',
      link: 'https://www.sfu.ca/world-languages.html',
      description: 'SFU literary magazine — editorial design, Vol. 16 & 17',
      image: '/images/projects/lyre-poster-flux.png',
      hasCaseStudy: true,
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
              <ProjectCard key={`bottom-${index}`} project={project} onCaseStudyClick={() => setOpenCaseStudy(project.title)} />
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
              <ProjectCard key={`bottom-${index}`} project={project} onCaseStudyClick={() => setOpenCaseStudy(project.title)} />
            ))}
          </div>
        </div>

        {/* Extra project(s) below the 8 squares - in line with top left square */}
        {projects.length > 8 && (
          <div className="absolute left-[28%] transform -translate-x-1/4 w-[25%]" style={{ bottom: 'calc(2% - 250px)' }}>
            <div className="grid grid-cols-2 gap-6 place-items-start">
              {projects.slice(8).map((project, index) => (
                <ProjectCard key={`extra-${index}`} project={project} onCaseStudyClick={() => setOpenCaseStudy(project.title)} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden pt-24 px-4 max-w-xl mx-auto text-center">
        {/* Top Grid (1x4) */}
        <div className="grid grid-cols-1 gap-6 mb-12">
          {projects.slice(0, 4).map((project, index) => (
            <ProjectCard key={`mobile-top-${index}`} project={project} onCaseStudyClick={() => setOpenCaseStudy(project.title)} />
          ))}
        </div>

        {/* Center Titles */}
        <div className="mb-10">
          <h2
            className="text-3xl text-gray-700 mb-2"
            style={{ fontFamily: "'Melo', sans-serif" }}
          >
            Projects
          </h2>
          <h3
            className="text-3xl text-gray-700"
            style={{ fontFamily: "'Melo', sans-serif" }}
          >
            Experiences
          </h3>
        </div>

        {/* Bottom Grid (1x4) */}
        <div className="grid grid-cols-1 gap-6 mt-6">
          {projects.slice(4, 8).map((project, index) => (
            <ProjectCard key={`mobile-bottom-${index}`} project={project} onCaseStudyClick={() => setOpenCaseStudy(project.title)} />
          ))}
        </div>

        {/* Extra project(s) below the 8 squares */}
        {projects.length > 8 && (
          <div className="grid grid-cols-1 gap-6 mt-6 max-w-sm mx-auto">
            {projects.slice(8).map((project, index) => (
              <ProjectCard key={`mobile-extra-${index}`} project={project} onCaseStudyClick={() => setOpenCaseStudy(project.title)} />
            ))}
          </div>
        )}
      </div>

      {/* Case Study Modal */}
      {openCaseStudy && (
        <CaseStudyModal
          projectTitle={openCaseStudy}
          onClose={() => setOpenCaseStudy(null)}
          project={projects.find(p => p.title === openCaseStudy)}
        />
      )}
    </div>
  )
}

function CaseStudyModal({ projectTitle, onClose, project }) {
  const caseStudies = {
    'Brig.AI': {
      overview: 'Brig.AI provides women with tools to advocate for their health, particularly addressing issues like medical dismissal and misdiagnosis in conditions such as PCOS and Endometriosis. We help women understand their symptoms and provide tangible next steps to self-advocate with their healthcare providers.',
      role: 'Product Manager & Backend Developer',
      timeline: 'AI4Good Lab, Summer 2024',
      challenge: 'Women face significant diagnostic delays and medical gaslighting due to gaps in understanding and biases in medical practice. Many women struggle to get proper diagnoses and appropriate care for conditions like PCOS and Endometriosis.',
      solution: 'Brig.AI provides a platform where women can educate themselves about diagnostic tests and empower themselves to advocate for proper healthcare. The platform uses machine learning to recommend appropriate diagnostic pathways based on symptoms, helping users understand what tests to ask for and how to effectively communicate with healthcare providers.',
      myContribution: 'I implemented Adaboost and clustering integration to enhance diagnostic accuracy and recommend appropriate tests based on symptoms. I utilized machine learning models including Logistic Regression, Adaboost, and K-means clustering to predict and recommend diagnostic pathways.',
      impact: [
        'Built during AI4Good Lab with focus on healthcare accessibility and empowerment',
        'ML-powered diagnostic recommendations based on symptom patterns',
        'Future collaboration planned with doctors and health leaders to further develop the product',
      ],
      keyFeatures: [
        'Educational resources about diagnostic tests for PCOS and Endometriosis',
        'AI-powered symptom analysis and test recommendations',
        'Privacy-first approach with no health data storage',
      ],
    },
    'PRD+': {
      overview: 'PRD+ is a Chrome extension that ensures best practices in the product requirements documentation process at TELUS. Built for UBC Product Management Club\'s flagship Product Sprint competition, PRD+ addresses the challenge of improving how product teams align on and communicate product requirements.',
      role: 'Team Member, Product Designer',
      timeline: 'UBC PMC Product Sprint, 2025',
      challenge: 'Product teams at TELUS struggle with aligning on and communicating product requirements and processes. Creating comprehensive PRDs is time-consuming, and teams often miss critical documentation elements, leading to misalignment and inefficient workflows.',
      solution: 'PRD+ is a Chrome extension featuring an in-built AI assistant (PRDude), a quick checklist to identify gaps in PRD criteria, and a centralized PRD database. The solution saves valuable time from PRD-related meetings, PRD writing, and knowledge search by ensuring teams follow best practices and have easy access to relevant documentation.',
      impact: [
        'Won 1st Place out of 20 teams',
        'Top prize: $800, llama stuffies, and a year of PM Exercises',
        'Addressed a real-world challenge from TELUS product teams',
        'Demonstrated practical experience across Discovery, Solution, Construction, and Presentation phases',
      ],
      keyFeatures: [
        'AI assistant (PRDude) for PRD guidance and best practices',
        'Quick checklist to identify missing PRD criteria',
        'Centralized PRD database for knowledge search',
        'Chrome extension for seamless integration into existing workflows',
      ],
      designLink: 'https://www.figma.com/design/3qY3c5FyRSYmdIhgryyZvm/PMC?node-id=183-452&t=KnR4gTzBg4mFkVCs-1',
    },
    'React to This!': {
      overview: 'React to This! is a research project with ROSIE Lab (Robots with Social Intelligence and Empathy) that explores how people interact with and respond to virtual agents. As a research assistant, I contributed across multiple dimensions of the project, from participant recruitment to multimedia production and data analysis.',
      role: 'Research Assistant',
      timeline: '2023-2024',
      solution: 'The project focuses on creating a comprehensive, annotated dataset of common physical and emotional reactions to virtual agents. The dataset is used to train and evaluate the performance of virtual agents in social interaction tasks.',
      myContribution: 'I made significant contributions across multiple areas: created a descriptive/documentary video to communicate the research, designed and built the project website, edited the research paper, annotated data for analysis, and recruited participants and volunteers for data collection.',
      impact: [
        'Enhanced project visibility through website design and development',
        'Improved research communication through documentary video production',
        'Contributed to data quality through annotation and participant recruitment',
        'Supported academic publication by editing and formatting the paper',
      ],
    },
    Spruce: {
      overview: 'Spruce helps low-income families in Vancouver discover free and low-cost “third-space” activities so kids can learn, play, and socialize offline. Built for UXathon 2026, the product won Best UI Design by delivering a warm, trustable experience that feels socially safe and easy to keep up.',
      role: 'Product Designer',
      timeline: 'UXathon 2026',
      challenge: 'The original prompt: “In a world that rewards being always on, how might we design an experience that helps people set and keep boundaries to make recovery time feel socially safe, rewarding, and easy to sustain?” \n Our reframed problem: How might we help low-income families give their children opportunities to participate in third-spaces, to create self-sustainable habits that prevent digital fatigue and long-term phone addiction?',
      solution: 'A free platform that helps low-income families discover free and low-cost “third-space” activities so kids can learn, play, and socialize offline. What if art gallery workshops, swim lessons, concerts, and coding camps could all be found in one simple search?',
      myContribution: 'Reframed the prompt into our problem statement, mapped and presented the journey for low-income families, built the visual system (logo, palette, typography), slide design, collaboration on profile, home, and activities pages.',
      keyFeatures: [
        'Location-aware, free and low-cost activity discovery with descriptive type tags',
        'Resources page for grants and other resources for low-income families',
        'Translate feature that makes the website accessible to non-English speakers',
        'User and child profiles for filtered search results',
      ],
      impact: [
        'Won Best UI Design at UXathon 2026',
        'Creates a safer, more rewarding path to offline habits for kids',
        'Reduces search friction for cost-sensitive families by curating vetted options',
      ],
      showcaseImages: [
        '/images/projects/spruce-1.png',
        '/images/projects/spruce-2.png',
        '/images/projects/spruce-3.png',
        '/images/projects/spruce-4.png',
      ],
    },
    'Community!': {
      overview: 'Community! is Treehouse Place—weekly co-working sessions at SFU (Burnaby and Surrey) for people to work on passion projects together. I designed the Treehouse Place website and create the monthly promotional graphics that announce sessions and bring a distinct visual identity to each month.',
      role: 'Design (website + promotional graphics)',
      timeline: 'Ongoing',
      challenge: 'Building a recognizable brand and consistent sign-up flow for recurring weekly sessions, while giving each month its own personality so the community stays engaged and the events feel fresh and inviting.',
      solution: 'A clear website (treehouse.place) for sign-up and context, plus a series of monthly Instagram graphics that tie into seasonal themes—cosmic/return in January, Valentine’s in February, and St. Patrick’s/luck in March—so each month has a distinct look while staying on-brand.',
      myContribution: 'I designed the Treehouse Place website and lead the visual direction for community promotion. I created the January, February, and March graphics: the January “treehouse is back” cosmic/nebula invite for SFU East Tower and SRYE sessions; the February Valentine’s graphic with cherubs and hearts for the horses, lovers, and crafters; and the March “Every Friday this March” St. Patrick’s/luck graphic with the green palette and playful characters. Each graphic includes dates, locations, and a clear call-to-action (link in bio/caption to sign up).',
      impact: [
        'Unified web presence and sign-up flow for Treehouse Place',
        'Monthly graphics that drive sign-ups and keep the community engaged',
        'Distinct, thematic visuals (January–March) that reinforce brand and event details',
      ],
      keyFeatures: [
        'Treehouse Place website design and UX',
        'January graphic: cosmic/nebula “is back” invite (East Tower & SRYE, SFU)',
        'February graphic: Valentine’s theme, cherubs, session dates and locations',
        'March graphic: St. Patrick’s/luck theme, “Every Friday this March,” be lucky / make stuff / have fun',
      ],
      showcaseImages: [
        '/images/projects/treehouse-jan.png',
        '/images/projects/treehouse-feb.png',
        '/images/projects/treehouse-mar.png',
      ],
    },
    'Simple Ventures': {
      overview: 'Aurora Pet Co. is a seamless subscription platform with vet-backed delivery and a focus on chronic conditions, designed to make pet health more affordable and accessible across Canada. The solution addresses the unmet need for an online pet pharmacy in the Canadian market.',
      role: 'Product Designer & Product Manager',
      timeline: 'Cansbridge x Simple Ventures, 2024',
      challenge: 'Rising pet ownership, growing demand for affordable care, and no dominant online pet pharmacy in Canada create a perfect storm of unmet need, regulatory barriers, and timing. Canada\'s 16M+ pet owners struggle with high medication costs and limited access to affordable pet healthcare.',
      solution: 'A seamless subscription platform with vet-backed delivery and a focus on chronic conditions to make pet health more affordable and accessible across Canada. The platform features transparent pricing, convenient subscription management, and reliable delivery, helping pet owners save $50–$100+ per year on medications.',
      impact: [
        'Top 4 finalist in Cansbridge x Simple Ventures pitch competition',
        'Acknowledged for best prototype and slide design',
        'Addresses unmet need for 16M+ Canadian pet owners',
        'Potential savings of $50–$100+ per year per pet owner',
      ],
      keyFeatures: [
        'Subscription-based medication delivery for chronic conditions',
        'Vet-backed prescription validation and delivery',
        'Transparent pricing model',
        'Focus on affordability and accessibility across Canada',
      ],
    },
    'jellyfish umbrella': {
      overview: 'Jellyfish umbrella is a creative project that combines product design, print, and wearable art: a zine (Roly Poly Zine) and a one-of-a-kind umbrella that reimagines the everyday object as a jellyfish, with a transparent canopy and hand-designed fabric and tentacle elements.',
      role: 'Product Designer, UX/UI & Artistic Director',
      timeline: 'Personal project',
      challenge: 'Blending functional product design with a strong artistic concept—creating something that reads clearly as both umbrella and jellyfish while staying usable, distinctive, and coherent across the zine and the physical object.',
      solution: 'A cohesive vision across two outputs: a zine that documents and extends the world of the project, and a custom umbrella with a transparent canopy and blue, segmented tentacle-like appendages around the rim. The fabric, form, and graphic language were all designed to support the same jellyfish concept.',
      myContribution: 'I led the project end-to-end as product designer, UX/UI designer, and artistic director. I created the zine from concept to final design, defined the jellyfish umbrella concept, and designed the fabric and tentacle elements so the object reads as a single, recognizable artifact.',
      impact: [
        'Unified product and print experience under one creative direction',
        'Custom-designed umbrella that doubles as art and functional object',
        'Zine that captures and extends the project narrative and visual language',
      ],
      keyFeatures: [
        'Original jellyfish umbrella concept and form language',
        'Custom fabric and tentacle design for the umbrella',
        'Roly Poly Zine—full zine design and art direction',
        'Coherent visual and conceptual system across zine and product',
      ],
    },
    'The Lyre': {
      overview: 'The Lyre is SFU’s literary magazine under World Languages and Literatures, publishing poetry, prose, translations, short stories, photography, and art. I’m the editorial designer for Vol. 17 and have contributed as an artist to Vol. 16.',
      role: 'Editorial Designer (Vol. 17)',
      timeline: '2025–2026',
      challenge: 'Creating a clear visual identity for each volume and driving submissions through promotional materials that communicate the theme and deadline while staying true to the magazine’s literary and artistic tone.',
      solution: 'A consistent editorial system for the magazine plus themed call-for-submissions posters. For Vol. 17 the theme is FLUX; the posters use typography, colour, and illustration (e.g. botanical motifs, “Constant Motion Experiment” artwork) to convey the theme and key information (deadline, categories, QR code).',
      myContribution: 'I am the editorial designer for Lyre Mag Vol. 17 this year. Right now I’m designing promotional posters for the call for submissions (e.g. the FLUX-themed poster and the Constant Motion Experiment poster), and I’ll be designing the full issue this summer. For Vol. 16 (Issue 16: Passage, Fall 2025), my painting appeared on the cover.',
      impact: [
        'Promotional posters for Vol. 17 that communicate the FLUX theme and submission details',
        'Cover art for Vol. 16 (Passage)',
        'Upcoming full-issue design for Vol. 17',
      ],
      keyFeatures: [
        'Vol. 17 call-for-submissions posters (theme: FLUX)',
        'Editorial design for the Vol. 17 issue (in progress, summer)',
        'Cover painting for Vol. 16: Passage',
        'SFU World Languages and Literatures / The Lyre branding',
      ],
      showcaseImages: [
        '/images/projects/lyre-poster-flux.png',
        '/images/projects/lyre-poster-constant-motion.png',
        '/images/projects/lyre-vol16-cover.png',
      ],
    },
  }

  const caseStudy = caseStudies[projectTitle]

  if (!caseStudy) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-start z-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Melo', sans-serif" }}>
              {projectTitle}
            </h2>
            <p className="text-gray-700 text-sm">{caseStudy.role} • {caseStudy.timeline}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 text-2xl font-light leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-8 space-y-8">
          {/* Overview */}
          <section>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Overview</h3>
            <p className="text-gray-700 leading-relaxed">{caseStudy.overview}</p>
          </section>

          {/* Challenge */}
          {caseStudy.challenge && (
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">The Challenge</h3>
              <p className="text-gray-700 leading-relaxed">{caseStudy.challenge}</p>
            </section>
          )}

          {/* Showcase Images */}
          {caseStudy.showcaseImages && caseStudy.showcaseImages.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Design Showcase</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caseStudy.showcaseImages.slice(0, 4).map((img, index) => (
                  <div
                    key={index}
                    className="w-full aspect-[4/3] rounded-md overflow-hidden bg-gray-100 shadow-sm"
                  >
                    <div
                      className="w-full h-full bg-center bg-cover"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Solution */}
          <section>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">The Solution</h3>
            <p className="text-gray-700 leading-relaxed">{caseStudy.solution}</p>
          </section>

          {/* My Contribution - only show if it exists */}
          {caseStudy.myContribution && (
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">My Contribution</h3>
              <p className="text-gray-700 leading-relaxed">{caseStudy.myContribution}</p>
            </section>
          )}

          {/* Key Features */}
          {caseStudy.keyFeatures && caseStudy.keyFeatures.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {caseStudy.keyFeatures.map((feature, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Impact */}
          <section>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Impact</h3>
            <ul className="space-y-2">
              {caseStudy.impact.map((impact, index) => (
                <li key={index} className="text-gray-700 flex items-start">
                  <span className="text-gray-700 mr-2">•</span>
                  <span>{impact}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* External Links */}
          {(project?.link || caseStudy.designLink) && (
            <section className="pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-3">
                {project?.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    {projectTitle === 'Simple Ventures' ? 'View Design →' : 'View Project →'}
                  </a>
                )}
                {caseStudy.designLink && (
                  <a
                    href={caseStudy.designLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-white border-2 border-gray-700 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    View Design →
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, onCaseStudyClick }) {
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
        {project.hasCaseStudy ? (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onCaseStudyClick()
            }}
            className="px-3 py-1.5 bg-white text-gray-800 rounded text-xs hover:bg-gray-200 transition-colors"
          >
            View Case Study
          </button>
        ) : (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-white text-gray-800 rounded text-xs hover:bg-gray-200 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            View
          </a>
        )}
      </div>
    </div>
  )
}

export default Projects
