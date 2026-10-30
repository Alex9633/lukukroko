// Opening section: the "Erilaisia. Mahtavia. Yhdessä!" headline, the intro, two call-to-action buttons and the big logo.
import { useLang } from "../i18n";
import Sparkles from "./Sparkles";

const ASSETS = `${import.meta.env.BASE_URL}assets`;

function Hero() {
  const { t } = useLang();
  return (
    <section className="hero" id="top">
      <Sparkles />
      <div className="wrap">
        <div>
          <h1 className="shout">
            <span className="a">{t.hero.a}</span>
            <span className="b">{t.hero.b}</span>
            <span className="c">{t.hero.c}</span>
          </h1>
          <p className="lead">
            <span>{t.hero.lead}</span>
            <span className="age">
              <b>5+</b>
              <span>{t.hero.age}</span>
            </span>
          </p>
          <div className="ctas">
            <a className="btn btn-sun" href="#pilotti">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M8 5.5v13l11-6.5z" />
              </svg>
              <span>{t.hero.cta1}</span>
            </a>
            <a className="btn btn-mint" href="#hahmot">
              {t.hero.cta2}
            </a>
          </div>
        </div>
        <div className="hero-logo">
          <img
            src={`${ASSETS}/logo-1400.webp`}
            srcSet={`${ASSETS}/logo-700.webp 700w, ${ASSETS}/logo-1400.webp 1400w`}
            sizes="(max-width: 760px) 92vw, 640px"
            width={1400}
            height={663}
            alt="Erilaiset Ystävät"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
