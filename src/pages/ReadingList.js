"use client";

import React, { useMemo } from "react";
import Navbar from "../components/Navbar";

export default function ReadingList() {
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 1024 : false;

  const booksOpenInRoom = useMemo(
    () => [
      { title: "Henry and June", author: "Anaïs Nin" },
      { title: "Pictures from Brueghel", author: "William Carlos Williams" },
      { title: "Middlemarch", author: "George Eliot" },
      { title: "Chez toi en France", author: "G. Brame and B. Tollu" },
      { title: "To the Lighthouse", author: "Virginia Woolf" },
      { title: "The Sun Also Rises", author: "Ernest Hemingway" },
      { title: "The Wicked King", author: "Holly Black" },
    ],
    []
  );

  const booksFinishedThisYear = useMemo(
    () => [
      { title: "From Third World to First", author: "Lee Kuan Yew" },
      { title: "Wuthering Heights", author: "Emily Brontë" },
      { title: "Never Let Me Go", author: "Kazuo Ishiguro" },
      { title: "The Ersatz Elevator", author: "Lemony Snicket" },
      { title: "Ella Enchanted", author: "Gail Carson Levine" },
      { title: "A Man Without a Country", author: "Kurt Vonnegut" },
      { title: "Anne's House of Dreams", author: "Lucy Maud Montgomery" },
      { title: "Six of Crows, Crooked Kingdom", author: "Leigh Bardugo" },
      { title: "The Cruel Prince", author: "Holly Black" },
    ],
    []
  );

  const essayItems = useMemo(() => {
    const items = [
      {
        text: "Dostoevsky as Lover",
        author: "Henrik Karlsson",
        link: "https://www.henrikkarlsson.xyz/p/doestoevsky-as-lover",
        date: "2025-01-25",
      },
      {
        text: "AGI isn't for happy people",
        author: "Stefan Kelly",
        link: "https://alreadyhappened.xyz/p/agi-isnt-for-happy-people",
        date: "2025-03-22",
      },
      {
        text: "How Hayao Miyazaki Builds a Story",
        author: "Wren Petkov",
        link: "https://storyfieldnotes.substack.com/p/how-hayao-miyazaki-builds-a-story",
        date: "2025-05-15",
      },
      {
        text: "Honesty in Relationships",
        author: "Ava Huang",
        link: "https://www.avabear.xyz/p/honesty-in-relationships?lli=1&utm_source=%2Finbox&utm_medium=reader2",
        date: "2025-10-23",
      },
      {
        text: "How to Dress a Monster, His Creator, and the Woman Who Loves Him",
        author: "Tara Maria Gonzalez",
        link: "https://open.substack.com/pub/taramariagonzalez/p/how-to-dress-a-monster-his-creator?utm_campaign=post-expanded-share&utm_medium=web",
        date: "2025-11-30",
      },
      {
        text: "Are You Serious?",
        author: "Visakan Veerasamy",
        link: "https://visakanv.substack.com/p/are-you-serious",
        date: "2025-09-18",
      },
      {
        text: "What's the Winning Strategy in China's 'low-trust' society?",
        author: "Robert Wu",
        link: "https://open.substack.com/pub/robertwoo/p/whats-the-winning-strategy-in-chinas?utm_campaign=post-expanded-share&utm_medium=web",
        date: "2025-08-25",
      },
      {
        text: "The Rare People Who Are Solid",
        author: "Sasha Chapin",
        link: "https://open.substack.com/pub/sashachapin/p/the-rare-people-who-are-solid?utm_campaign=post&utm_medium=email",
        date: "2026-01-14",
      },
      {
        text: "Quick Take: How the French Invented Love",
        author: "David Roman",
        link: "https://open.substack.com/pub/mankind/p/quick-take-how-the-french-invented?utm_campaign=post&utm_medium=email",
        date: "2025-06-08",
      },
      {
        text: "Magic alfredo, romcoms, and asian tiger parents",
        author: "Jesse",
        link: "https://open.substack.com/pub/fishinapool/p/magic-alfredo-romcoms-and-asian-tiger?utm_campaign=post-expanded-share&utm_medium=post%20viewer",
        date: "2026-01-09",
      },
      {
        text: "Marty Mauser Is Deeply Unlikeable But His Clothing Is Not",
        author: "Tara Maria Gonzalez",
        link: "https://open.substack.com/pub/taramariagonzalez/p/marty-mauser-is-deeply-unlikeable?utm_campaign=post-expanded-share&utm_medium=post%20viewer",
        date: "2025-12-31",
      },
      {
        text: "How to Do Great Work",
        author: "Paul Graham",
        link: "https://paulgraham.com/greatwork.html",
        date: "2026-04-20",
      },
    ];

    // Sort newest → oldest
    return items.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div
        className="pt-20 pb-12 px-8 max-w-2xl mx-auto"
        style={{ marginTop: "0px", textAlign: isMobile ? "center" : "left" }}
      >
        <div className="text-4xl text-gray-700 mb-2" style={{ fontFamily: "'Melo', sans-serif" }}>
          reading list
        </div>
        <div className="text-gray-500" style={{ fontFamily: "'Arial', sans-serif", fontSize: "16px", marginBottom: "24px" }}>
          A small collection of essays and books I wholeheartedly recommend.
        </div>

        <div
          className="bg-white border border-gray-200"
          style={{ borderRadius: "8px", boxShadow: "0 10px 28px rgba(0,0,0,0.05)", padding: isMobile ? "14px 14px" : "18px 20px" }}
        >
          <div
            className="text-gray-500 text-[13px] mb-4"
            style={{
              fontFamily: "'Arial', sans-serif",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginTop: "2px",
            }}
          >
            books I have open in my room somewhere
          </div>

          <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "16px" }}>
            {booksOpenInRoom.map((b) => (
              <div key={`${b.title}-${b.author}`} style={{ marginBottom: "22px" }}>
                <div
                  className="text-gray-700"
                  style={{
                    fontFamily: "'Moto', serif",
                    fontSize: isMobile ? "16px" : "18px",
                    lineHeight: "1.35",
                  }}
                >
                  {b.title}
                </div>
                <div
                  className="text-gray-500"
                  style={{
                    fontFamily: "'Arial', sans-serif",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "21px",
                    marginTop: "2px",
                    letterSpacing: "1.3px",
                  }}
                >
                  {b.author}
                </div>
              </div>
            ))}
          </div>

          <div
            className="text-gray-500 text-[13px] mb-4 mt-8"
            style={{
              fontFamily: "'Arial', sans-serif",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            books I finished this year
          </div>

          <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "16px" }}>
            {booksFinishedThisYear.map((b) => (
              <div key={`${b.title}-${b.author}`} style={{ marginBottom: "22px" }}>
                <div
                  className="text-gray-700"
                  style={{
                    fontFamily: "'Moto', serif",
                    fontSize: isMobile ? "16px" : "18px",
                    lineHeight: "1.35",
                  }}
                >
                  {b.title}
                </div>
                <div
                  className="text-gray-500"
                  style={{
                    fontFamily: "'Arial', sans-serif",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "21px",
                    marginTop: "2px",
                    letterSpacing: "1.3px",
                  }}
                >
                  {b.author}
                </div>
              </div>
            ))}
          </div>

          <div
            className="text-gray-500 text-[13px] mb-4 mt-8"
            style={{
              fontFamily: "'Arial', sans-serif",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Essays I like
          </div>

          <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "16px" }}>
            {essayItems.map((e) => (
              <div key={e.link} style={{ marginBottom: "22px" }}>
                <a
                  href={e.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 hover:underline"
                  style={{
                    fontFamily: "'Moto', serif",
                    fontSize: isMobile ? "14px" : "15px",
                    lineHeight: "1.35",
                    display: "inline",
                  }}
                >
                  {e.text}
                </a>
                <div
                  className="text-gray-500"
                  style={{
                    fontFamily: "'Arial', sans-serif",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "21px",
                    marginTop: "2px",
                    letterSpacing: "1.3px",
                  }}
                >
                  {e.author ? `${e.author} · ` : ""}
                  {e.date}
                </div>
              </div>
            ))}
          </div>

        </div>
        <div
          className="text-gray-500 mt-6"
          style={{ fontFamily: "'Arial', sans-serif", fontSize: "12px", textAlign: isMobile ? "center" : "left" }}
        >
          message me for all time favorites
        </div>
      </div>
    </div>
  );
}

