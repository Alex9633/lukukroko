import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";
import logo from "./assets/logo.png";
import youtube from "./assets/youtube.png";
import facebook from "./assets/facebook.png";
import instagram from "./assets/instagram.png";
import tiktok from "./assets/tiktok.png";

// Emailjs Configuration
const EMAILJS_SERVICE_ID  = "service_2doux08";
const EMAILJS_TEMPLATE_ID = "template_8ou0lto";
const EMAILJS_PUBLIC_KEY  = "cV8TXuPt265OG0roQ";

const RECIPIENT_EMAIL = "lukukroko@gmail.com";

// Links
const SOCIAL_LINKS = [
  { href: "https://www.youtube.com/@LUKUKROKO", src: youtube, alt: "YouTube" },
  { href: "https://www.facebook.com/profile.php?id=61573951087624", src: facebook, alt: "Facebook" },
  { href: "https://www.instagram.com/lukukroko/", src: instagram, alt: "Instagram" },
  { href: "https://www.tiktok.com/@lukukroko", src: tiktok, alt: "TikTok" },
];

// Helpers
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Types
type SubmitStatus = "idle" | "sending" | "success" | "error";

// Components
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

interface TitleProps {
  status: SubmitStatus;
}

function Title({ status }: TitleProps) {
  const statusText: Partial<Record<SubmitStatus, string>> = {
    sending: "…",
    success: "Kiitos! ✨",
    error:   "Jokin meni pieleen.",
  };

  const text = statusText[status] ?? "Hauska tutustua!";

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

// Main
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
      <img src={logo} alt="LUKUKROKO" className="logo" />
      <SocialLinks />
      <Title status={status} />
      <SubscribeForm email={email} status={status} onChange={handleEmailChange} onSubmit={handleSubmit} />
      <footer className="footer">Copyright © 2026 LUKUKROKO</footer>
    </div>
  );
}

export default App;
