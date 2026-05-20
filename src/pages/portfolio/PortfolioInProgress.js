'use client'

import React from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import '../App.css'
import './PortfolioInProgress.css'

export default function PortfolioInProgress() {
  return (
    <div className="portfolio-in-progress-page">
      <Navbar />
      <main className="portfolio-in-progress-main">
        <h1 className="portfolio-in-progress-heading">in progress</h1>
        <Link href="/portfolio" className="portfolio-in-progress-back">
          ← back to portfolio
        </Link>
      </main>
    </div>
  )
}
