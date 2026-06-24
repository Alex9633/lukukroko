import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";
import stickerLogo from "./assets/StickerLogo.png";
import logo from "./assets/logo.png";
import youtube from "./assets/youtube.png";
import facebook from "./assets/facebook.png";
import instagram from "./assets/instagram.png";
import tiktok from "./assets/tiktok.png";
import tableImg from "./assets/table.png";
import tutorialImg from "./assets/tutorial1.png";
import endImg from "./assets/slika_kraj.png"

// Emailjs Configuration
const EMAILJS_SERVICE_ID  = "service_2doux08";
const EMAILJS_TEMPLATE_ID = "template_8ou0lto";
const EMAILJS_PUBLIC_KEY  = "cV8TXuPt265OG0roQ";

const RECIPIENT_EMAIL = "lukukroko@gmail.com";

const SOCIAL_LINKS = [
  { href: "https://www.youtube.com/@LUKUKROKO", src: youtube, alt: "YouTube" },
  { href: "https://www.facebook.com/profile.php?id=61573951087624", src: facebook, alt: "Facebook" },
  { href: "https://www.instagram.com/lukukroko/", src: instagram, alt: "Instagram" },
  { href: "https://www.tiktok.com/@lukukroko", src: tiktok, alt: "TikTok" },
];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type SubmitStatus = "idle" | "sending" | "success" | "error";

function SocialLinks() {
  return (
    <nav className="socials" aria-label="Sosiaalinen media">
      {SOCIAL_LINKS.map(({ href, src, alt }) => (
        <a key={alt} href={href} target="_blank" rel="noopener noreferrer"
           className="social-link" aria-label={alt}>
          <img src={src} alt={alt} />
        </a>
      ))}
    </nav>
  );
}

function WelcomeSection() {
  return (
    <section className="welcome-section">
      <h1 className="main-heading">🎉 TERVETULOA MYSTEERIKIRJEKLUBIIN  ✉️</h1>
      <div className="welcome-text">
        <p>
          Milloin viimeksi odotit kirjettä postista? <br />
          Nykyään kaikki saapuu puhelimeen sekunneissa – sähköpostit, viestit ja
          ilmoitukset. Mutta oikean kirjeen saapumisessa on jotain erityistä. Jotain, mitä ei
          voi korvata näytöllä. <br />
          Joka kuukausi saat yllätyskuoren, jonka sisältö pysyy salaisuutena siihen asti,
          kunnes avaat sen.
        </p>
      </div>
      <ul className="features-list">
        <li>📬 Mysteerikirje</li>
        <li>🎨 Uniikki keräilytarra</li>
        <li>💌 Kortteja, viestejä ja yllätyksiä</li>
        <li>📖 Painettu tarina, joka liittyy Erilaiset Ystävät – sarjaan</li>
        <li>✨ Uusi jakso tarinasta jokaisessa kirjeessä</li>
        <li>🍵 teepussi ja</li>
        <li>🧩 palapelejä</li>
      </ul>
      <p className="follow-text">
        Seuraa hahmojen seikkailuja, kun tarina etenee kuukausi<br/>kuukaudelta kirjeiden mukana.
      </p>
      <p className="star-divider">*</p>
      <p className="delivery-info">
        ✉️ Kaikki hinnat sisältävät toimituksen kaikkialle Suomeen.<br />
        Ei lisämaksuja toimituksesta.
      </p>
    </section>
  );
}

function HowToOrder() {
  return (
    <section className="how-to-section">
      <div className="how-to-images">
        <img src={tableImg} alt="Hinnasto" className="pricing-table-img" />
        <img src={tutorialImg} alt="Tilausohjeet MobilePay" className="tutorial-img" />
      </div>
      <div className="how-to-steps">
        <h2 className="how-to-heading">NÄIN TILAAT</h2>
        <ol className="steps-list">
          <li className="steps-list-item">
            <span className="step-title">Avaa MobilePay</span>
            <br />Etsi Ana Malinen tai syötä numero
            <br /><strong>+358 41 480 8949</strong>
          </li>
          <li className="steps-list-item">
            <span className="step-title">Valitse Tilauksesi</span>
            <br />Syötä haluamasi tilauksen summa:
            <ul>
              <li>1 Mysteerikirje (Kk kokeilu) — 10 €</li>
              <li>3 Kuukauden Tilaus — 26 €</li>
              <li>6 Kuukauden Tilaus — 48 €</li>
              <li>12 Kuukauden Tilaus — 86 €</li>
            </ul>
          </li>
          <li className="steps-list-item">
            <span className="step-title">Lisää Tietosi</span>
            <br />Kirjoita maksun viestikenttään:
            <ul>
              <li>Koko nimesi</li>
              <li>Postiosoitteesi</li>
            </ul>
          </li>
          <li className="steps-list-item">
            <span className="step-title">Suorita Maksu</span>
            <br />Tarkista tiedot ja lähetä maksu MobilePayn kautta.
          </li>
          <li className="steps-list-item">
            <span className="step-title">Haluatko lisätä tietoja?</span>
            <br />Maksun jälkeen voit lähettää MobilePay-chatissa lisätietoja, korjauksia tai erityistoiveita.
          </li>
          <li className="steps-list-item">
            <span className="step-title">Vahvistus</span>
            <br />Kun maksu on vastaanotettu, vahvistan sen MobilePay-chatissa ja Mysteerikirjeklubiin tilauksesi aktivoidaan.
          </li>
        </ol>
      </div>
    </section>
  );
}

interface TitleProps {
  status: SubmitStatus;
}

function Title({ status }: TitleProps) {
  const statusText: Partial<Record<SubmitStatus, string>> = {
    sending: "…",
    success: "Kiitos! ✨",
    error:   "Jokin meni pieleen.",
  };

  const text = statusText[status] ?? "Kiitos! ✨";

  return (
    <p
      className={`title ${status !== "idle" ? `title--${status}` : ""}`}
      role="status"
      aria-live="polite"
    >
      {text}
    </p>
  );
}

interface SubscribeFormProps {
  email: string;
  status: SubmitStatus;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

function SubscribeForm({ email, status, onChange, onSubmit }: SubscribeFormProps) {
  const isValid = isValidEmail(email);
  const showInvalid = email.length > 0 && !isValid;
  const isDisabled = status === "sending";

  return (
    <div className="subscribe-section">
      <input
        type="email"
        className={`email-input${showInvalid ? " email-input--invalid" : ""}`}
        placeholder="Sähköposti"
        value={email}
        onChange={(e) => onChange(e.target.value)}
        disabled={isDisabled}
        aria-label="Sähköpostiosoite"
        aria-invalid={showInvalid}
      />
      <button
        className="submit-btn"
        onClick={onSubmit}
        disabled={!isValid || isDisabled}
        aria-busy={status === "sending"}
      >
        {status === "sending" ? "…" : "TILAA"}
      </button>
    </div>
  );
}

function EndImage() {
  return (
    <img src={endImg} alt="" className="end-img" />
  );
}

function App() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const lastSentAt = useRef<number | null>(null);
  const COOLDOWN_MS = 20000;

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async () => {
    if (!isValidEmail(email)) return;

    const now = Date.now();
    if (lastSentAt.current && now - lastSentAt.current < COOLDOWN_MS) {
      const secondsLeft = Math.ceil((COOLDOWN_MS - (now - lastSentAt.current)) / 1000);
      alert(`Odota ${secondsLeft} sekuntia ennen uutta lähetystä.`);
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { subscriber_email: email, to_email: RECIPIENT_EMAIL },
        EMAILJS_PUBLIC_KEY
      );
      lastSentAt.current = Date.now();
      setStatus("success");
      setEmail("");
    } catch (err: any) {
      console.error("EmailJS error:", err?.status, err?.text, err);
      setStatus("error");
    }
  };

  return (
    <div className="app">
      <img src={stickerLogo} alt="Erilaiset Ystävät" className="sticker-logo" />
      <SocialLinks />
      <WelcomeSection />
      <HowToOrder />
      <EndImage />
      <div className="subscribe-wrapper">
        <Title status={status} />
        <SubscribeForm email={email} status={status} onChange={handleEmailChange} onSubmit={handleSubmit} />
      </div>
      <img src={logo} alt="LUKUKROKO" className="logo" />
      <footer className="footer">Copyright © 2026 LUKUKROKO</footer>
    </div>
  );
}

export default App;
