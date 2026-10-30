// Sticky top bar: social links, the section menu (a drop-down button on phones) and the FI/EN language switch.
import { useEffect, useRef, useState } from "react";
import { Lang, useLang } from "../i18n";

const SECTIONS = [
  ["#pilotti", "pilot"],
  ["#jaksot", "episodes"],
  ["#hahmot", "cast"],
  ["#uutiskirje", "news"],
] as const;

const LANGUAGES: { code: Lang; title: string }[] = [
  { code: "fi", title: "Suomeksi" },
  { code: "en", title: "In English" },
];

export function NavLinks({ onClick }: { onClick?: () => void }) {
  const { t } = useLang();
  return (
    <>
      {SECTIONS.map(([href, key]) => (
        <a key={href} href={href} onClick={onClick}>
          {t.nav[key]}
        </a>
      ))}
    </>
  );
}

function Header() {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <>
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <header className="top">
        <div className="wrap">
          <div className="social">
            <a href="https://www.tiktok.com/@lukukroko" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/lukukroko/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg className="ig" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5.2" />
                <circle cx="12" cy="12" r="4.2" />
                <circle className="dot" cx="17.4" cy="6.6" r="1.2" />
              </svg>
            </a>
          </div>
          <button
            ref={menuButton}
            className="menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {t.menu}
          </button>
          <nav className={menuOpen ? "nav open" : "nav"} id="nav" aria-label={t.navLabel}>
            <NavLinks onClick={() => setMenuOpen(false)} />
          </nav>
          <div className="lang" role="group" aria-label={t.langLabel}>
            {LANGUAGES.map(({ code, title }) => (
              <button
                key={code}
                type="button"
                lang={code}
                title={title}
                aria-pressed={lang === code}
                onClick={() => setLang(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
