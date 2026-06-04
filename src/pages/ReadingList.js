'use client'

import React, { useMemo } from 'react'
import Navbar from '../components/Navbar'
import './App.css'
import './ReadingList.css'

function BookEntry({ title, author }) {
  return (
    <div className="reading-list-entry">
      <p className="reading-list-entry-title">{title}</p>
      <p className="reading-list-entry-meta">{author}</p>
    </div>
  )
}

function EssayEntry({ text, author, link, date }) {
  return (
    <div className="reading-list-entry">
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="reading-list-entry-title reading-list-entry-title--link"
      >
        {text}
      </a>
      <p className="reading-list-entry-meta">
        {author ? `${author} · ` : ''}
        {date}
      </p>
    </div>
  )
}

function ReadingSection({ label, children }) {
  return (
    <section className="reading-list-section">
      <p className="reading-list-section-label">{label}</p>
      <div className="reading-list-section-body">{children}</div>
    </section>
  )
}

export default function ReadingList() {
  const currentlyReading = useMemo(
    () => [
      { title: 'How Music Works', author: 'David Byrne' },
      { title: 'The Poison Eaters', author: 'Holly Black' },
    ],
    []
  )

  const booksOpenInRoom = useMemo(
    () => [
      { title: 'Henry and June', author: 'Anaïs Nin' },
      { title: 'Pictures from Brueghel', author: 'William Carlos Williams' },
      { title: 'Middlemarch', author: 'George Eliot' },
      { title: 'Chez toi en France', author: 'G. Brame and B. Tollu' },
      { title: 'To the Lighthouse', author: 'Virginia Woolf' },
      { title: 'The Sun Also Rises', author: 'Ernest Hemingway' },
    ],
    []
  )

  const booksFinishedThisYear = useMemo(
    () => [
      { title: 'The Queen of Nothing', author: 'Holly Black' },
      { title: 'From Third World to First', author: 'Lee Kuan Yew' },
      { title: 'Wuthering Heights', author: 'Emily Brontë' },
      { title: 'Never Let Me Go', author: 'Kazuo Ishiguro' },
      { title: 'The Ersatz Elevator', author: 'Lemony Snicket' },
      { title: 'Ella Enchanted', author: 'Gail Carson Levine' },
      { title: 'A Man Without a Country', author: 'Kurt Vonnegut' },
      { title: "Anne's House of Dreams", author: 'Lucy Maud Montgomery' },
      { title: 'Six of Crows, Crooked Kingdom', author: 'Leigh Bardugo' },
      { title: 'The Cruel Prince', author: 'Holly Black' },
      { title: 'The Wicked King', author: 'Holly Black' },
    ],
    []
  )

  const essayItems = useMemo(() => {
    const items = [
      {
        text: 'Dostoevsky as Lover',
        author: 'Henrik Karlsson',
        link: 'https://www.henrikkarlsson.xyz/p/doestoevsky-as-lover',
        date: '2025-01-25',
      },
      {
        text: "AGI isn't for happy people",
        author: 'Stefan Kelly',
        link: 'https://alreadyhappened.xyz/p/agi-isnt-for-happy-people',
        date: '2025-03-22',
      },
      {
        text: 'How Hayao Miyazaki Builds a Story',
        author: 'Wren Petkov',
        link: 'https://storyfieldnotes.substack.com/p/how-hayao-miyazaki-builds-a-story',
        date: '2025-05-15',
      },
      {
        text: 'Honesty in Relationships',
        author: 'Ava Huang',
        link: 'https://www.avabear.xyz/p/honesty-in-relationships?lli=1&utm_source=%2Finbox&utm_medium=reader2',
        date: '2025-10-23',
      },
      {
        text: 'How to Dress a Monster, His Creator, and the Woman Who Loves Him',
        author: 'Tara Maria Gonzalez',
        link: 'https://open.substack.com/pub/taramariagonzalez/p/how-to-dress-a-monster-his-creator?utm_campaign=post-expanded-share&utm_medium=web',
        date: '2025-11-30',
      },
      {
        text: 'Are You Serious?',
        author: 'Visakan Veerasamy',
        link: 'https://visakanv.substack.com/p/are-you-serious',
        date: '2025-09-18',
      },
      {
        text: "What's the Winning Strategy in China's 'low-trust' society?",
        author: 'Robert Wu',
        link: 'https://open.substack.com/pub/robertwoo/p/whats-the-winning-strategy-in-chinas?utm_campaign=post-expanded-share&utm_medium=web',
        date: '2025-08-25',
      },
      {
        text: 'The Rare People Who Are Solid',
        author: 'Sasha Chapin',
        link: 'https://open.substack.com/pub/sashachapin/p/the-rare-people-who-are-solid?utm_campaign=post&utm_medium=email',
        date: '2026-01-14',
      },
      {
        text: 'Quick Take: How the French Invented Love',
        author: 'David Roman',
        link: 'https://open.substack.com/pub/mankind/p/quick-take-how-the-french-invented?utm_campaign=post&utm_medium=email',
        date: '2025-06-08',
      },
      {
        text: 'Magic alfredo, romcoms, and asian tiger parents',
        author: 'Jesse',
        link: 'https://open.substack.com/pub/fishinapool/p/magic-alfredo-romcoms-and-asian-tiger?utm_campaign=post-expanded-share&utm_medium=post%20viewer',
        date: '2026-01-09',
      },
      {
        text: 'Marty Mauser Is Deeply Unlikeable But His Clothing Is Not',
        author: 'Tara Maria Gonzalez',
        link: 'https://open.substack.com/pub/taramariagonzalez/p/marty-mauser-is-deeply-unlikeable?utm_campaign=post-expanded-share&utm_medium=post%20viewer',
        date: '2025-12-31',
      },
      {
        text: 'How to Do Great Work',
        author: 'Paul Graham',
        link: 'https://paulgraham.com/greatwork.html',
        date: '2026-04-20',
      },
    ]

    return items.sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [])

  return (
    <div className="reading-list-page bg-white min-h-screen">
      <Navbar />

      <main className="reading-list-main">
        <header className="reading-list-header">
          <h1 className="reading-list-title">reading list</h1>
          <p className="reading-list-lede">
            A small collection of essays and books on my mind lately.
          </p>
        </header>

        <div className="reading-list-card">
          <ReadingSection label="currently reading">
            {currentlyReading.map((b) => (
              <BookEntry key={`${b.title}-${b.author}`} title={b.title} author={b.author} />
            ))}
          </ReadingSection>

          <ReadingSection label="books I have open in my room somewhere">
            {booksOpenInRoom.map((b) => (
              <BookEntry key={`${b.title}-${b.author}`} title={b.title} author={b.author} />
            ))}
          </ReadingSection>

          <ReadingSection label="books I finished this year">
            {booksFinishedThisYear.map((b) => (
              <BookEntry key={`${b.title}-${b.author}`} title={b.title} author={b.author} />
            ))}
          </ReadingSection>

          <ReadingSection label="Essays I like">
            {essayItems.map((e) => (
              <EssayEntry
                key={e.link}
                text={e.text}
                author={e.author}
                link={e.link}
                date={e.date}
              />
            ))}
          </ReadingSection>
        </div>

        <p className="reading-list-footer">message me for all time favorites</p>
      </main>
    </div>
  )
}
