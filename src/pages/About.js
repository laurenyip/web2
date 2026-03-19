import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import "./App.css";

const ABOUT_MAIN = "/images/about/main";

function AboutImageModal({ src, onClose }) {
  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-[95vw] max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-0 -translate-y-2 translate-x-2 rounded-full bg-black/50 hover:bg-black/70 text-white text-4xl font-light leading-none w-10 h-10 flex items-center justify-center"
          aria-label="Close"
        >
          ×
        </button>
        <img
          src={src}
          alt="Expanded about view"
          className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}

export default function About() {
  const [openAboutImage, setOpenAboutImage] = useState(null);

  // Vinyl shelf (same look/behavior as before; centered now)
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

  const musicItems = useMemo(
    () => [
      {
        type: "music",
        text: "Clash",
        date: "2025-12-28",
        image: "/images/about/current/clash.jpg",
        link: "https://en.wikipedia.org/wiki/London_Calling",
        songs: [],
      },
      {
        type: "music",
        text: "Stop Making Sense",
        date: "2025-08-04",
        image: "/images/about/current/sms.jpg",
        link: "https://letterboxd.com/laurenyip/film/stop-making-sense/",
        songs: [],
      },
      {
        type: "music",
        text: "Graceland",
        date: "2025-12-26",
        image: "/images/about/current/graceland.jpg",
        link: "https://open.spotify.com/album/6WgGWYw6XXQyLTsWt7tXky",
        songs: [],
      },
      {
        type: "music",
        text: "YN",
        date: "2025-12-27",
        image: "/images/about/current/yn.jpg",
        link: "https://open.spotify.com/album/4qApTp9557qYZzRLEih4uP",
        songs: [],
      },
    ],
    []
  );

  const getMusicShelfPositions = (items, mobile) => {
    const positions = [];
    const containerWidth = mobile ? 400 : 950;
    const padding = mobile ? 20 : 30;

    let vinylSize, shelfSpacing;
    if (mobile && items.length > 0) {
      const availableWidth = containerWidth;
      const numVinyls = items.length;
      const spacingBetweenVinyls = 3;
      vinylSize = Math.floor(
        (availableWidth - (numVinyls - 1) * spacingBetweenVinyls) / numVinyls
      );
      shelfSpacing = spacingBetweenVinyls;
    } else {
      vinylSize = 119;
      shelfSpacing = 18;
    }

    const shelfHeight = mobile ? 340 : 175;
    const shelfThickness = 12;

    const shelfWidth = mobile
      ? containerWidth
      : Math.min(
          items.length * vinylSize +
            (items.length - 1) * shelfSpacing +
            padding * 2,
          containerWidth * 0.9
        );

    // Center shelf + vinyls by offsetting from the left.
    const shelfLeft = Math.max(0, Math.floor((containerWidth - shelfWidth) / 2));

    for (let i = 0; i < items.length; i++) {
      const leftPosition = shelfLeft + (mobile ? 0 : padding) + i * (vinylSize + shelfSpacing);
      positions.push({
        top: `${shelfHeight - vinylSize}px`,
        left: `${leftPosition}px`,
        rotation: 0,
        height: vinylSize,
        isMusic: true,
      });
    }

    return { positions, shelfBottom: shelfHeight + shelfThickness, shelfWidth, shelfHeight, shelfLeft };
  };

  const musicShelf = useMemo(
    () => getMusicShelfPositions(musicItems, isMobile),
    [musicItems, isMobile]
  );

  return (
    <div className="bg-white min-h-screen overflow-x-visible">
      <Navbar />

      <div style={{ paddingTop: "100px" }}>
        {/* Mobile hero */}
        <div
          className="lg:hidden relative w-full"
          style={{
            minHeight: "100vh",
            paddingTop: 0,
            pointerEvents: "none",
            marginTop: "0",
          }}
        >
          {/* Centered title + tagline (mobile) */}
          <div
            className="absolute inset-0 z-30 flex items-center justify-center"
            style={{
              pointerEvents: "auto",
              padding: "0 22px",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "520px",
                transform: "translateY(-94px)",
              }}
            >
            <h1
              className="text-gray-700 mb-4 text-center"
              style={{
                fontFamily: "'Melo', sans-serif",
                fontSize: "clamp(77px, 14.4vw, 128px)",
                lineHeight: 1.02,
              }}
            >
              Lauren Yip
            </h1>
            <p
              className="text-gray-600 font-light text-center"
              style={{
                fontFamily: "'Arial', sans-serif",
                letterSpacing: "0.02em",
                fontSize: "14px",
                transform: "none",
                margin: 0,
              }}
            >
              4th year Computer Science @ SFU · Aspiring Product Manager ·
              Artist and Explorer
            </p>
            <p
              className="text-gray-700 text-center"
              style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: "12px",
                lineHeight: 1.45,
                marginTop: "12px",
                maxWidth: "340px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              I'm passionate about visual storytelling and the intersection of
              technology and art. I want to make something that matters. If
              anything in this page resonates with you, please reach out to me!
              I would love to be your friend.
            </p>
            </div>
          </div>

          <img
            src={`${ABOUT_MAIN}/About6.jpg`}
            className="aboutImage absolute cursor-pointer transition-transform hover:scale-105"
            width={120}
            height={160}
            loading="lazy"
            style={{
              top: "14px",
              left: "14px",
              width: "92px",
              zIndex: 45,
              pointerEvents: "auto",
            }}
            alt="about6"
            onClick={() => setOpenAboutImage(`${ABOUT_MAIN}/About6.jpg`)}
          />

          <img
            src={`${ABOUT_MAIN}/About17.jpg`}
            className="aboutImage absolute cursor-pointer transition-transform hover:scale-105"
            width={120}
            height={160}
            loading="lazy"
            style={{
              top: "14px",
              right: "14px",
              width: "92px",
              zIndex: 45,
              pointerEvents: "auto",
            }}
            alt="about17"
            onClick={() => setOpenAboutImage(`${ABOUT_MAIN}/About17.jpg`)}
          />

          <img
            src={`${ABOUT_MAIN}/about2.jpg`}
            className="aboutImage absolute cursor-pointer transition-transform hover:scale-105"
            width={120}
            height={90}
            loading="eager"
            style={{
              bottom: "114px",
              left: "14px",
              width: "104px",
              zIndex: 45,
              pointerEvents: "auto",
            }}
            alt="about2"
            onClick={() => setOpenAboutImage(`${ABOUT_MAIN}/about2.jpg`)}
          />

          <img
            src={`${ABOUT_MAIN}/About11.jpg`}
            className="aboutImage absolute cursor-pointer transition-transform hover:scale-105"
            width={120}
            height={160}
            loading="lazy"
            style={{
              bottom: "114px",
              right: "14px",
              width: "92px",
              zIndex: 45,
              pointerEvents: "auto",
            }}
            alt="about11"
            onClick={() => setOpenAboutImage(`${ABOUT_MAIN}/About11.jpg`)}
          />
        </div>

        {/* Desktop hero */}
        <div
          className="hidden lg:block relative w-full"
          style={{
            minHeight: "500px",
            paddingTop: "100px",
            pointerEvents: "none",
            marginTop: "0",
          }}
        >
          <div
            className="relative mx-auto"
            style={{ width: "100%", maxWidth: "1400px", height: "500px" }}
          >
            <div
              className="relative text-right z-30"
              style={{
                width: "100%",
                pointerEvents: "auto",
                paddingRight: "56px",
                marginTop: "0",
              }}
            >
              <h1
                className="text-[120px] text-gray-700 mb-6"
                style={{ fontFamily: "'Melo', sans-serif" }}
              >
                Lauren Yip
              </h1>
              <p
                className="text-gray-600 font-light text-right"
                style={{
                  fontFamily: "'Arial', sans-serif",
                  letterSpacing: "0.02em",
                  fontSize: "14px",
                  transform: "none",
                  margin: 0,
                }}
              >
                Computer Science @ SFU · Aspiring Product Manager · Artist and
                Explorer
              </p>
            </div>

            {/* fish.gif positioned to the left of the name */}
            <img
              src={`${ABOUT_MAIN}/fish.gif`}
              className="aboutImage absolute cursor-pointer transition-transform hover:scale-105"
              width={200}
              height={150}
              loading="lazy"
              style={{
                top: "-10px",
                right: "520px",
                width: "200px",
                transform: "rotate(-1deg)",
                zIndex: 40,
                pointerEvents: "auto",
              }}
              alt="fish"
              onClick={() => setOpenAboutImage(`${ABOUT_MAIN}/fish.gif`)}
            />

            {/* Filler text in bottom half (centered) */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "64%",
                transform: "translateY(-50%)",
                zIndex: 60,
                pointerEvents: "none",
                padding: "0 26px",
              }}
            >
              <p
                className="text-gray-700 text-sm leading-relaxed text-center"
                style={{
                  fontFamily: "'Arial', sans-serif",
                  maxWidth: "385px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                I'm passionate about visual storytelling and the intersection of
                technology and art. I want to make something that matters. If
                anything in this page resonates with you, please reach out to
                me! I would love to be your friend.
              </p>
            </div>

            <img
              src={`${ABOUT_MAIN}/about2.jpg`}
              className="aboutImage absolute cursor-pointer transition-transform hover:scale-105"
              width={221}
              height={166}
              loading="eager"
              style={{
                top: "350px",
                right: "calc(10% - 25px)",
                width: "221px",
                zIndex: 40,
                pointerEvents: "auto",
              }}
              alt="about2"
              onClick={() => setOpenAboutImage(`${ABOUT_MAIN}/about2.jpg`)}
            />

            <img
              src={`${ABOUT_MAIN}/About6.jpg`}
              className="aboutImage absolute cursor-pointer transition-transform hover:scale-105"
              width={190}
              height={253}
              loading="lazy"
              style={{
                top: "25px",
                left: "calc(2% + 5px)",
                width: "24.48%",
                maxWidth: "156px",
                zIndex: 40,
                pointerEvents: "auto",
              }}
              alt="about6"
              onClick={() => setOpenAboutImage(`${ABOUT_MAIN}/About6.jpg`)}
            />

            <img
              src={`${ABOUT_MAIN}/About11.jpg`}
              className="aboutImage absolute cursor-pointer transition-transform hover:scale-105"
              width={158}
              height={211}
              loading="lazy"
              style={{
                top: "325px",
                left: "calc(4%)",
                width: "20.4%",
                maxWidth: "130px",
                zIndex: 40,
                pointerEvents: "auto",
              }}
              alt="about11"
              onClick={() => setOpenAboutImage(`${ABOUT_MAIN}/About11.jpg`)}
            />
            <div
              style={{
                position: "absolute",
                top: "325px",
                left: "calc(2%)",
                zIndex: 55,
                pointerEvents: "none",
                writingMode: "vertical-rl",
                textOrientation: "upright",
                letterSpacing: "5px",
                color: "#6b7280",
                fontSize: "16px",
                fontFamily: "'Arial', sans-serif",
              }}
            >
              廣州
            </div>

            <img
              src={`${ABOUT_MAIN}/About17.jpg`}
              className="aboutImage absolute cursor-pointer transition-transform hover:scale-105"
              width={158}
              height={211}
              loading="lazy"
              style={{
                top: "-55px",
                left: "calc(36% - 25px)",
                width: "180px",
                zIndex: 40,
                pointerEvents: "auto",
              }}
              alt="about17"
              onClick={() => setOpenAboutImage(`${ABOUT_MAIN}/About17.jpg`)}
            />
            <div
              style={{
                position: "absolute",
                top: "-55px",
                left: "calc(36% - 55px)",
                zIndex: 55,
                pointerEvents: "none",
                writingMode: "vertical-rl",
                textOrientation: "upright",
                letterSpacing: "5px",
                color: "#6b7280",
                fontSize: "16px",
                fontFamily: "'Arial', sans-serif",
              }}
            >
              怡保
            </div>
          </div>
        </div>

        {/* Archive */}
        <div style={{ marginTop: "1rem", paddingBottom: "4rem" }}>
          <h3
            className="text-center mb-12 text-2xl md:text-3xl text-gray-700"
            style={{ fontFamily: "'Melo', sans-serif" }}
          >
            archive
          </h3>

          {/* Vinyl shelf (same as before, centered) */}
          {musicItems.length > 0 && (
            <div className="w-full flex justify-center">
              <div
                className="relative"
                style={{
                  width: `${isMobile ? 400 : 950}px`,
                  height: `${(musicShelf.shelfBottom || 352) + 40}px`,
                }}
              >
                {/* Wooden Shelf */}
                <div
                  className="absolute z-15"
                  style={{
                    top: `${(musicShelf.shelfBottom || 352) - 12}px`,
                    left: `${musicShelf.shelfLeft || 0}px`,
                    width: `${musicShelf.shelfWidth || (isMobile ? 400 : 400)}px`,
                    height: "12px",
                  }}
                >
                  <div
                    className="w-full h-full relative"
                    style={{
                      background:
                        "linear-gradient(to bottom, #8B6914 0%, #A0822D 25%, #8B6914 50%, #6B4E0F 75%, #8B6914 100%)",
                      boxShadow:
                        "inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)",
                      borderTop: "1px solid rgba(139, 105, 20, 0.5)",
                      borderBottom: "1px solid rgba(107, 78, 15, 0.8)",
                    }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-full opacity-20"
                        style={{
                          height: "1px",
                          top: `${i * 2.4}px`,
                          background:
                            i % 2 === 0
                              ? "linear-gradient(to right, transparent, rgba(107, 78, 15, 0.5), transparent)"
                              : "linear-gradient(to left, transparent, rgba(139, 105, 20, 0.5), transparent)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Vinyls */}
                {musicItems.map((item, index) => {
                  const pos = musicShelf.positions[index];
                  if (!pos) return null;
                  const vinylSize = pos.height;
                  const centerHole = vinylSize * 0.15;

                  const colors = [
                    { from: "#1a1a1a", via: "#0d0d0d", to: "#000000" },
                    { from: "#2b2b2b", via: "#101010", to: "#000000" },
                    { from: "#1f1f1f", via: "#0d0d0d", to: "#000000" },
                    { from: "#222222", via: "#0f0f0f", to: "#000000" },
                  ][index % 4];

                  const textSize = isMobile ? "text-[10px]" : "text-xs";
                  const dateSize = isMobile ? "text-[9px]" : "text-[10px]";

                  return (
                    <div
                      key={`music-${index}`}
                      className="absolute cursor-pointer transition-transform hover:scale-105 z-20 group"
                      style={{
                        top: pos.top,
                        left: pos.left,
                        transform: `rotate(${pos.rotation}deg)`,
                        width: `${vinylSize}px`,
                        height: `${vinylSize}px`,
                      }}
                      onClick={() => {
                        if (item.link) {
                          window.open(item.link, "_blank", "noopener,noreferrer");
                          return;
                        }
                        if (item.image) setOpenAboutImage(item.image);
                      }}
                    >
                      {/* Album Sleeve (Cover) */}
                      <div
                        className="absolute inset-0 bg-white transition-all duration-700 ease-in-out group-hover:opacity-0 group-hover:scale-90 group-hover:rotate-180"
                        style={{
                          transformOrigin: "center center",
                          zIndex: 2,
                          width: `${vinylSize}px`,
                          height: `${vinylSize}px`,
                          boxShadow:
                            "0 4px 8px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)",
                        }}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.text}
                            className="w-full h-full"
                            style={{
                              objectFit: "cover",
                              display: "block",
                            }}
                            loading="lazy"
                          />
                        ) : (
                          <div className="bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center w-full h-full">
                            <div className="text-white text-center px-2 py-4">
                              <p className={`${textSize} font-medium mb-1`}>
                                {item.text}
                              </p>
                              <p className={`${dateSize} opacity-80`}>
                                {item.date}
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-black opacity-10" />
                      </div>

                      {/* Vinyl Record (revealed on hover) */}
                      <div
                        className="absolute inset-0 transition-all duration-700 ease-in-out opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
                        style={{
                          transformOrigin: "center center",
                          zIndex: 1,
                        }}
                      >
                        <div
                          className="relative rounded-full mx-auto group-hover:animate-spin-slow"
                          style={{
                            width: `${vinylSize}px`,
                            height: `${vinylSize}px`,
                            background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.via} 50%, ${colors.to} 100%)`,
                            boxShadow:
                              "inset 0 0 20px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)",
                          }}
                        >
                          {[0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map(
                            (radius, idx) => (
                              <div
                                key={idx}
                                className="absolute rounded-full border opacity-20"
                                style={{
                                  width: `${vinylSize * radius}px`,
                                  height: `${vinylSize * radius}px`,
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  borderColor: "rgba(0,0,0,0.3)",
                                }}
                              />
                            )
                          )}

                          <div
                            className="absolute rounded-full bg-white shadow-inner"
                            style={{
                              width: `${centerHole * 2}px`,
                              height: `${centerHole * 2}px`,
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              boxShadow: "inset 0 0 10px rgba(0,0,0,0.2)",
                            }}
                          >
                            <div
                              className="absolute rounded-full bg-black"
                              style={{
                                width: `${centerHole * 0.4}px`,
                                height: `${centerHole * 0.4}px`,
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Essay window (simple text links) */}
          {essayItems.length > 0 && (
            <div className="w-full mt-10">
              <div
                className="bg-white border border-gray-200"
                style={{
                  width: isMobile ? "min(86vw, 360px)" : "520px",
                  maxWidth: "86vw",
                  marginLeft: isMobile ? "calc(50% - 200px)" : "calc(50% - 475px)",
                  marginRight: "auto",
                  padding: isMobile ? "14px 14px" : "18px 20px",
                  borderRadius: "8px",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
                  height: isMobile ? "260px" : "210px",
                  overflowY: "auto",
                }}
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
                <div
                  className="space-y-4"
                  style={{
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  {essayItems.map((e) => (
                    <div key={e.link}>
                      <a
                        href={e.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-700 hover:underline"
                        style={{
                          fontFamily: "'Moto', serif",
                          fontSize: isMobile ? "13px" : "14px",
                          lineHeight: "1.35",
                          textAlign: "left",
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
                          textAlign: "left",
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
          )}
        </div>
      </div>

      <AboutImageModal
        src={openAboutImage}
        onClose={() => setOpenAboutImage(null)}
      />
    </div>
  );
}
