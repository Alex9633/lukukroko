// "Join us!" newsletter sign-up. Like the old site's form, it sends the subscriber's address to the Lukukroko inbox through EmailJS.
import { FormEvent, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useLang } from "../i18n";
import Sparkles from "./Sparkles";

// EmailJS account that forwards every new subscriber to the Lukukroko inbox.
const EMAILJS_SERVICE_ID = "service_2doux08";
const EMAILJS_TEMPLATE_ID = "template_8ou0lto";
const EMAILJS_PUBLIC_KEY = "cV8TXuPt265OG0roQ";
const RECIPIENT_EMAIL = "lukukroko@gmail.com";

// Pause between sends, so the form can't be used to flood the inbox.
const COOLDOWN_MS = 20000;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

interface Notice {
  ok: boolean;
  text: string;
}

function Newsletter() {
  const { lang, t } = useLang();
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const lastSentAt = useRef(0);

  useEffect(() => setNotice(null), [lang]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const consentInput = form.elements.namedItem("consent") as HTMLInputElement;
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
      setNotice({ ok: false, text: t.news.errEmail });
      emailInput.focus();
      return;
    }
    if (!consentInput.checked) {
      setNotice({ ok: false, text: t.news.errConsent });
      consentInput.focus();
      return;
    }
    const waitMs = COOLDOWN_MS - (Date.now() - lastSentAt.current);
    if (waitMs > 0) {
      setNotice({ ok: false, text: t.news.wait(Math.ceil(waitMs / 1000)) });
      return;
    }

    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { subscriber_email: email, to_email: RECIPIENT_EMAIL, language: lang },
        EMAILJS_PUBLIC_KEY
      );
      lastSentAt.current = Date.now();
      setNotice({ ok: true, text: t.news.ok });
      form.reset();
    } catch (err: any) {
      console.error("EmailJS error:", err?.status, err?.text, err);
      setNotice({ ok: false, text: t.news.fail });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="sec" id="uutiskirje" aria-labelledby="news-h">
      <Sparkles />
      <div className="wrap">
        <div className="news">
          <div>
            <h2 className="h2 flame" id="news-h">
              {t.news.h}
            </h2>
            <p>{t.news.p}</p>
          </div>
          <form className="form" onSubmit={handleSubmit} noValidate>
            <label className="vh" htmlFor="email">
              {t.news.label}
            </label>
            <div className="field">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                placeholder={t.news.ph}
              />
              <button className="btn btn-sun" type="submit" disabled={sending}>
                {sending ? "…" : t.news.btn}
              </button>
            </div>
            <label className="consent">
              <input type="checkbox" name="consent" required />
              <span>{t.news.consent}</span>
            </label>
            <p className={notice ? `msg ${notice.ok ? "ok" : "err"}` : "msg"} role="status" aria-live="polite">
              {notice?.text}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
