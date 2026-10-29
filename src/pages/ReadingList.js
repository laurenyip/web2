'use client'

import React, { useMemo } from 'react'
import Navbar from '../components/layout/Navbar'
import './App.css'
import './ReadingList.css'

const EMAIL = 'laurenyip20@gmail.com'

// "2026-04-20" → "Apr 2026" (parsed as a calendar date, so the month never shifts with the time zone)
function formatEssayDate(iso) {
  const [year, month] = iso.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function BookEntry({ title, author }) {
  return (
    <li className="reading-list-entry">
      <p className="reading-list-entry-title">{title}</p>
      <p className="reading-list-entry-meta">{author}</p>
    </li>
  )
}

function EssayEntry({ text, author, link, date }) {
  return (
    <li className="reading-list-entry">
      <a href={link} target="_blank" rel="noreferrer" className="reading-list-entry-title reading-list-entry-title--link">
        {text}
        <span className="reading-list-entry-arrow" aria-hidden="true">
          ↗
        </span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <p className="reading-list-entry-meta">
        {author ? `${author} · ` : ''}
        <time dateTime={date}>{formatEssayDate(date)}</time>
      </p>
    </li>
  )
}

/** One ruled section: heading (with a count) on the left, the list on the right from tablet up. */
function ReadingSection({ id, label, count, wide = false, children }) {
  return (
    <section className={`reading-list-section${wide ? ' reading-list-section--wide' : ''}`} aria-labelledby={id}>
      <h2 id={id} className="reading-list-section-label">
        {label}
        <span className="reading-list-count">{count}</span>
      </h2>
      <ul className="reading-list-entries" role="list">
        {children}
      </ul>
    </section>
  )
}

export default function ReadingList() {
  const currentlyReading = useMemo(
    () => [
      { title: 'All Quiet on the Western Front', author: 'Erich Maria Remarque' },
      { title: 'Taipei Travelogue', author: 'Yáng Shuāng-zǐ' },
      { title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez' },
    ],
    []
  )

  const booksOpenInRoom = useMemo(
    () => [
      { title: 'Pictures from Brueghel', author: 'William Carlos Williams' },
      { title: 'Middlemarch', author: 'George Eliot' },
      { title: 'Chez toi en France', author: 'G. Brame and B. Tollu' },
      { title: 'To the Lighthouse', author: 'Virginia Woolf' },
    ],
    []
  )

  const booksFinishedThisYear = useMemo(
    () => [
      { title: 'Things Fall Apart', author: 'Chinua Achebe' },
      { title: 'Martyr!', author: 'Kaveh Akbar' },
      { title: 'The Princess Bride', author: 'William Goldman' },
      { title: 'Coraline', author: 'Neil Gaiman' },
      { title: 'Taipei Story', author: 'R.F. Kuang' },
      { title: 'Love in the Time of Cholera', author: 'Gabriel García Márquez' },
      { title: 'Henry and June', author: 'Anaïs Nin' },
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
      {
        title: 'You Can Just Do Things: How High-Agency People Get What They Want Out of Life',
        author: 'Cate Hall and Sasha Chapin',
      },
      { title: 'How Music Works', author: 'David Byrne' },
      { title: 'The Sun Also Rises', author: 'Ernest Hemingway' },
      { title: 'The Poison Eaters', author: 'Holly Black' },
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
        </header>

        <div className="reading-list-sections">
          <ReadingSection id="rl-reading" label="currently reading" count={currentlyReading.length}>
            {currentlyReading.map((b) => (
              <BookEntry key={`${b.title}-${b.author}`} title={b.title} author={b.author} />
            ))}
          </ReadingSection>

          <ReadingSection id="rl-open" label="books I have open in my room somewhere" count={booksOpenInRoom.length}>
            {booksOpenInRoom.map((b) => (
              <BookEntry key={`${b.title}-${b.author}`} title={b.title} author={b.author} />
            ))}
          </ReadingSection>

          <ReadingSection id="rl-essays" label="essays I like" count={essayItems.length}>
            {essayItems.map((e) => (
              <EssayEntry key={e.link} text={e.text} author={e.author} link={e.link} date={e.date} />
            ))}
          </ReadingSection>

          <ReadingSection id="rl-finished" label="books I finished this year" count={booksFinishedThisYear.length} wide>
            {booksFinishedThisYear.map((b) => (
              <BookEntry key={`${b.title}-${b.author}`} title={b.title} author={b.author} />
            ))}
          </ReadingSection>
        </div>

        <p className="reading-list-footer">
          <a href={`mailto:${EMAIL}`}>message me</a> for all time favorites
        </p>
      </main>
    </div>
  )
}
