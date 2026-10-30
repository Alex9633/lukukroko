// "Four new episodes" section: the coming-soon badge and a card for each upcoming episode (2–5).
import { useLang } from "../i18n";
import Sparkles from "./Sparkles";

function Episodes() {
  const { t } = useLang();
  return (
    <section className="sec" id="jaksot" aria-labelledby="eps-h">
      <Sparkles />
      <div className="wrap">
        <div className="eps-head">
          <div>
            <h2 className="h2 sun" id="eps-h">
              <span>{t.eps.h}</span>{" "}
              <span className="fi-flag" aria-hidden="true">
                <svg viewBox="-2 -8 70 60">
                  <rect className="pole" x="0" y="0" width="5" height="44" rx="2.5" />
                  <g className="cloth">
                    <rect x="5" y="2" width="56" height="34" rx="3" fill="#fff" />
                    <rect x="20" y="2" width="10" height="34" fill="#0D3B82" />
                    <rect x="5" y="14" width="56" height="10" fill="#0D3B82" />
                  </g>
                </svg>
              </span>
            </h2>
            <p className="sub">{t.eps.sub}</p>
          </div>
          <span className="badge">{t.eps.badge}</span>
        </div>
        <ol className="eps">
          {t.eps.list.map((ep, i) => {
            const episode = i + 2;
            return (
              <li key={episode} className={`ep e${episode}`}>
                <span className="num">{episode}</span>
                <span className="place">{ep.tag}</span>
                <h3>{ep.title}</h3>
                <p>{ep.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default Episodes;
