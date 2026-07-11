'use client'

import Navbar from '../components/Navbar'
import './App.css'

export default function Playground() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-2xl px-6 pb-20 pt-[calc(7rem+50px)] md:px-10">
        <h1
          className="text-3xl text-gray-800 tracking-tight md:text-4xl"
          style={{ fontFamily: "'Melo', sans-serif" }}
        >
          Playground
        </h1>
        <p className="about-body-text mt-4 text-gray-600">
          Experiments, side quests, and things in motion. More coming soon.
        </p>
      </main>
    </div>
  )
}
