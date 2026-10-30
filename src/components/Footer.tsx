// Page footer: the section links and the copyright line.
import { useLang } from "../i18n";
import { NavLinks } from "./Header";
import Sparkles from "./Sparkles";

function Footer() {
  const { t } = useLang();
  return (
    <footer>
      <Sparkles />
      <div className="wrap">
        <nav aria-label={t.footLabel}>
          <NavLinks />
        </nav>
        <span>
          © {new Date().getFullYear()} Erilaiset Ystävät · {t.credit} Ana Malinen · lukukroko.fi
        </span>
      </div>
    </footer>
  );
}

export default Footer;
