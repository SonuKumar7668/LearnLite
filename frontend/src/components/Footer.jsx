import { useNavigate } from "react-router";

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const columns = [
    {
      heading: "Product",
      links: ["Features", "How It Works", "Pricing", "Changelog"],
      paths: ["/features", "/how-it-works", "/pricing", "/changelog"],
    },
    {
      heading: "Learn",
      links: ["Start Learning", "Quiz Mode", "Progress", "Topics"],
      paths: ["/learn", "/quiz", "/progress", "/topics"],
    },
    {
      heading: "Company",
      links: ["About", "Blog", "Careers", "Contact"],
      paths: ["/about", "/blog", "/careers", "/contact"],
    },
  ];

  return (
    <footer
      className="bg-[#0a0f1e] text-[#f0ece3]"
      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .ft-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(240,236,227,0.4);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          text-align: left;
          transition: color 0.2s;
          display: block;
        }
        .ft-link:hover { color: #e8c547; }

        .ft-social {
          width: 38px;
          height: 38px;
          border: 1px solid rgba(240,236,227,0.1);
          border-radius: 4px;
          background: transparent;
          color: rgba(240,236,227,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        .ft-social:hover {
          border-color: #e8c547;
          color: #e8c547;
          background: rgba(232,197,71,0.06);
        }

        .ft-wordmark {
          font-size: clamp(72px, 14vw, 160px);
          font-weight: 400;
          line-height: 0.9;
          letter-spacing: -0.02em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(240,236,227,0.08);
          user-select: none;
          pointer-events: none;
        }

        .ft-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(240,236,227,0.1);
          border-radius: 4px;
          padding: 10px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #f0ece3;
          outline: none;
          transition: border-color 0.2s;
          width: 220px;
        }
        .ft-input::placeholder { color: rgba(240,236,227,0.22); }
        .ft-input:focus { border-color: rgba(232,197,71,0.4); }
      `}</style>


      {/* ── LINKS SECTION ── */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-8 md:px-12 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="col-span-2">
            <p
              className="text-[22px] mb-3"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Learn<span className="text-[#e8c547]">Lite</span>
            </p>
            <p
              className="text-[14px] font-light text-[#f0ece3]/35 leading-[1.8] max-w-[220px] mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              AI-powered learning that makes any subject simple and genuinely understandable.
            </p>

            <div className="flex gap-2">
              {[
                { s: "X", h: "https://x.com" },
                { s: "in", h: "https://linkedin.com" },
                { s: "gh", h: "https://github.com" },
                { s: "yt", h: "https://youtube.com" },
              ].map(({ s, h }) => (
                <a key={s} href={h} target="_blank" rel="noreferrer" className="ft-social">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map(({ heading, links, paths }) => (
            <div key={heading}>
              <p
                className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#f0ece3]/25 mb-5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {heading}
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-[14px]">
                {links.map((label, i) => (
                  <li key={label}>
                    <button className="ft-link" onClick={() => navigate(paths[i])}>
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── GIANT WORDMARK ── */}
      <div className="overflow-hidden px-8 md:px-12 pt-10 pb-4 max-w-[1100px] mx-auto">
        <p className="ft-wordmark">LearnLite</p>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="max-w-[1100px] mx-auto px-8 md:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/[0.04]">
        <span
          className="text-[12px] text-[#f0ece3]/20"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          © {year} LearnLite. All rights reserved.
        </span>

        <div className="flex items-center gap-6">
          {["Privacy", "Terms", "Cookies"].map((l) => (
            <button
              key={l}
              onClick={() => navigate(`/${l.toLowerCase()}`)}
              className="ft-link"
              style={{ fontSize: 12, color: "rgba(240,236,227,0.2)" }}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="w-[6px] h-[6px] rounded-full bg-emerald-400 animate-pulse block" />
          <span
            className="text-[12px] text-[#f0ece3]/20"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}