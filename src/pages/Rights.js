'use client'

import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import './App.css'
import './Rights.css'

const CONTACT_EMAIL = 'laurenyip20@gmail.com'

export default function Rights() {
  useEffect(() => {
    const header = document.querySelector('.navbar')
    if (!header) return undefined

    const handleScroll = () => {
      if (window.scrollY >= 0) {
        header.classList.add('navbarDark')
      } else {
        header.classList.remove('navbarDark')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const year = new Date().getFullYear()

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main className="rights-page pt-[100px] pb-16 px-6 md:px-10 max-w-2xl mx-auto">
        <header className="rights-header mb-10 md:mb-12">
          <h1 className="rights-title">Licensing &amp; Usage</h1>
          <p className="rights-lede">
            Thanks for caring about how this work is shared. Here&apos;s a plain-language guide to what you can and
            can&apos;t do with the artwork and photography on this site.
          </p>
        </header>

        <div className="rights-sections">
          <section className="rights-section">
            <h2 className="rights-section-title">Copyright</h2>
            <p>
              All artwork and photography on this site is © Lauren Yip {year}. Canadian copyright protection applies
              automatically upon creation under the Copyright Act of Canada. No registration required.
            </p>
          </section>

          <section className="rights-section">
            <h2 className="rights-section-title">What you can do</h2>
            <p>
              You&apos;re welcome to share images from this site on social media — please credit me by name and link
              back to{' '}
              <a href="https://laurenyip.com" className="rights-link">
                laurenyip.com
              </a>
              . Personal, non-commercial sharing with attribution is fine.
            </p>
          </section>

          <section className="rights-section">
            <h2 className="rights-section-title">What you can&apos;t do</h2>
            <ul className="rights-list">
              <li>Reproduce work for commercial use without permission</li>
              <li>Print, sell, or redistribute images</li>
              <li>Use work in AI training datasets or generative models</li>
            </ul>
          </section>

          <section className="rights-section">
            <h2 className="rights-section-title">Want to license something?</h2>
            <p>
              If you&apos;d like to use an image for a project, publication, or product, I&apos;m happy to talk. Send a
              note with what you have in mind and we can figure out terms that work for both of us.
            </p>
            <p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="rights-link">
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>

          <section className="rights-section">
            <h2 className="rights-section-title">Press &amp; editorial</h2>
            <p>
              High-resolution files and usage permissions for press or editorial purposes are available on request —
              just reach out at the email above.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
