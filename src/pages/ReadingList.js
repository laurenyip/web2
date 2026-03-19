import React, { useMemo } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function ReadingList() {
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 1024 : false;

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
    ];

    // Sort newest → oldest
    return items.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="pt-20 pb-12 px-8 max-w-2xl mx-auto" style={{ marginTop: "50px" }}>
        <div className="text-4xl text-gray-700 mb-2" style={{ fontFamily: "'Melo', sans-serif" }}>
          reading list
        </div>
        <div className="text-gray-500" style={{ fontFamily: "'Arial', sans-serif", fontSize: "14px", marginBottom: "24px" }}>
          A small collection of essays I wholeheartedly recommend.
        </div>

        <div
          className="bg-white border border-gray-200"
          style={{ borderRadius: "8px", boxShadow: "0 10px 28px rgba(0,0,0,0.05)", padding: isMobile ? "14px 14px" : "18px 20px" }}
        >
          <div
            className="text-gray-500 text-[11px] mb-4"
            style={{
              fontFamily: "'Arial', sans-serif",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            essays i like
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
                    fontSize: isMobile ? "13px" : "14px",
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
                    fontSize: "11px",
                    marginTop: "2px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {e.author ? `${e.author} · ` : ""}
                  {e.date}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "8px" }}>
            <Link
              to="/about"
              className="text-gray-500 hover:underline"
              style={{ fontFamily: "'Arial', sans-serif", fontSize: "13px" }}
            >
              Back to About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

