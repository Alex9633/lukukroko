// "Meet the friends" section: a card for each of the five characters.
import { useLang } from "../i18n";
import Sparkles from "./Sparkles";
import sumu from "../assets/friends/sumu.png";
import jussi from "../assets/friends/jussi.png";
import susi from "../assets/friends/susi.png";
import nalle from "../assets/friends/nalle.png";
import tottu from "../assets/friends/tottu.png";

const FRIENDS = [
  { name: "Sumu", picture: sumu },
  { name: "Jussi", picture: jussi },
  { name: "Susi", picture: susi },
  { name: "Nalle", picture: nalle },
  { name: "Tottu", picture: tottu },
];

function Cast() {
  const { t } = useLang();
  return (
    <section className="sec" id="hahmot" aria-labelledby="cast-h">
      <Sparkles />
      <div className="wrap">
        <h2 className="h2 mint" id="cast-h">
          {t.cast.h}
        </h2>
        <p className="sub">{t.cast.sub}</p>
        <ul className="cast">
          {FRIENDS.map(({ name, picture }, i) => (
            <li key={name} className={`friend f${i + 1}`}>
              <img className="face" src={picture} alt={name} width={600} height={600} loading="lazy" />
              <h3>{name}</h3>
              <p className="trait">{t.cast.list[i].trait}</p>
              <p>{t.cast.list[i].text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Cast;
