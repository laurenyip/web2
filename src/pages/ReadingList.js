import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";

function BookModal({ book, onClose }) {
  if (!book) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "95vw", maxHeight: "95vh" }}
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-0 -translate-y-2 translate-x-2 rounded-full bg-black/50 hover:bg-black/70 text-white text-4xl font-light leading-none w-10 h-10 flex items-center justify-center"
          aria-label="Close"
        >
          ×
        </button>

        <img
          src={book.src}
          alt={book.title}
          style={{
            maxWidth: "95vw",
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: "12px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        />

        {book.title ? (
          <div
            style={{
              marginTop: "12px",
              fontFamily: "'Arial', sans-serif",
              fontSize: "13px",
              color: "#6b7280",
              textAlign: "center",
            }}
          >
            {book.title}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function ReadingList() {
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 1024 : false;

  const [openBook, setOpenBook] = useState(null);

  const bookCovers = useMemo(
    () => [
      { src: "/images/about/current/milena.jpg", title: "Milena" },
      { src: "/images/about/current/henry-and-june.png", title: "Henry and June" },
      { src: "/images/about/current/anne.png", title: "Anne" },
      { src: "/images/about/current/power-broker-cover.png", title: "The Power Broker" },
      { src: "/images/about/current/third-world-cover.png", title: "Third World" },
      { src: "/images/about/current/never-let-me-go.png", title: "Never Let Me Go" },
      { src: "/images/about/current/oxford-american-essays.png", title: "Oxford American Essays" },
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
    ];

    // Sort newest → oldest
    return items.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="pt-20 pb-12 px-8 max-w-2xl mx-auto" style={{ marginTop: "100px" }}>
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
              marginTop: "2px",
            }}
          >
            books
          </div>

          <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "16px" }}>
            <div style={{ position: "relative", paddingBottom: "22px" }}>
              {/* bookshelf base */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "14px",
                  borderRadius: "8px",
                  background:
                    "linear-gradient(to bottom, rgba(139,105,20,0.95) 0%, rgba(107,78,15,0.95) 100%)",
                  boxShadow:
                    "inset 0 2px 4px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.10)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  zIndex: 0,
                }}
              />

              {/* 7 across shelf */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "grid",
                  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                  gap: "clamp(6px, 1.2vw, 14px)",
                  alignItems: "end",
                }}
              >
                {bookCovers.map((b) => (
                  <button
                    key={b.src}
                    type="button"
                    onClick={() => setOpenBook({ src: b.src, title: b.title })}
                    className="p-0 bg-transparent border-0 cursor-pointer"
                    style={{
                      height: "clamp(110px, 16vw, 175px)",
                      width: "100%",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                    aria-label={`Open ${b.title}`}
                  >
                    <img
                      src={b.src}
                      alt={b.title}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

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

        </div>
      </div>

      <BookModal book={openBook} onClose={() => setOpenBook(null)} />
    </div>
  );
}

