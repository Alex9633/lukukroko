// Pilot episode section: episode 1 embedded from YouTube inside a phone frame.
import { useLang } from "../i18n";
import Sparkles from "./Sparkles";

function Pilot() {
  const { t } = useLang();
  return (
    <section className="sec" id="pilotti" aria-labelledby="pilot-h">
      <Sparkles />
      <div className="wrap">
        <div className="pilot">
          <h2 className="h2 mint" id="pilot-h">
            <span className="line">{t.pilot.h1}</span>
            <span className="line">{t.pilot.h2}</span>
          </h2>
          <p>{t.pilot.p}</p>
          <div className="phone">
            <div className="yt">
              <iframe
                src="https://www.youtube-nocookie.com/embed/_e3-2CfEzgo?rel=0&playsinline=1"
                title={t.pilot.cap}
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
          <a className="yt-link" href="https://www.youtube.com/watch?v=_e3-2CfEzgo" target="_blank" rel="noopener noreferrer">
            {t.pilot.cta}
          </a>
          <p className="credit">
            <span>{t.credit}</span> <strong>Ana Malinen</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Pilot;
