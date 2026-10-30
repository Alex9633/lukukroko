// Site texts in Finnish and English, and the language state every section reads them through.
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

const fi = {
  title: "Erilaiset Ystävät – Lukukroko",
  desc: "Erilaiset Ystävät – lastensarja suomalaisesta kulttuurista, perinteistä, kielestä ja huumorista. Katso pilottijakso ja tutustu ystäviin.",
  skip: "Siirry sisältöön",
  menu: "Valikko",
  navLabel: "Päävalikko",
  footLabel: "Alavalikko",
  langLabel: "Kieli",
  credit: "Ohjaus ja tuotanto:",
  nav: {
    pilot: "Pilottijakso",
    episodes: "Jaksot",
    cast: "Hahmot",
    news: "Uutiskirje",
  },
  hero: {
    a: "Erilaisia.",
    b: "Mahtavia.",
    c: "Yhdessä!",
    lead: "Tervetuloa suomalaisen kulttuurin, perinteiden, kielen ja huumorin maailmaan. Jokainen jakso on uusi seikkailu täynnä oivalluksia, iloa ja yhdessä oppimista.",
    age: "Sopii katsottavaksi 5-vuotiaasta alkaen.",
    cta1: "Katso pilottijakso",
    cta2: "Tutustu hahmoihin",
  },
  pilot: {
    h1: "Jakso 1:",
    h2: "Erilaiset Ystävät",
    p: "Tutustu ystäviin ja astu mukaan ensimmäiseen seikkailuun! Pilottijakso on nyt katsottavissa YouTubessa.",
    cta: "Katso myös YouTubessa",
    cap: "Erilaiset Ystävät – pilottijakso",
  },
  eps: {
    h: "Neljä uutta jaksoa",
    sub: "Seikkailu jatkuu – ystävät matkaavat ympäri Suomea.",
    badge: "Tulossa 2027",
    list: [
      { tag: "Tampere", title: "Aina osa minua", text: "Kotikaupunki kulkee mukana, minne ikinä menemmekin." },
      { tag: "Metsä", title: "Jokaisenoikeuksilla metsään!", text: "Mitä luonnossa saa tehdä – ja miten metsästä pidetään huolta yhdessä?" },
      { tag: "Ruoka", title: "Maasta pöytään – sydämellä tehty", text: "Pellolta lautaselle: mistä ruokamme oikein tulee?" },
      { tag: "Kalevala", title: "Väinämöisen kantele", text: "Vanha tarina, uusi sävel – ystävät löytävät kanteleen taian." },
    ],
  },
  cast: {
    h: "Tutustu ystäviin",
    sub: "Viisi erilaista ystävää, yksi yhteinen seikkailu.",
    list: [
      { trait: "Utelias ja iloinen", text: "Keksii ratkaisun pulmaan kuin pulmaan – joskus hieman yllättävän." },
      { trait: "Kekseliäs ystävä", text: "Kysyy aina ”miksi?” ja löytää vastauksen yhdessä muiden kanssa." },
      { trait: "Rauhallinen tutkija", text: "Katselee, kuuntelee ja huomaa sen, minkä muut ohittavat." },
      { trait: "Metsän paras hakkeri", text: "Aina yhteydessä wifiin! Nalle ratkaisee jokaisen teknisen pulman koko metsässä." },
      { trait: "Nallen kummitussiili", text: "Tottu leijuu seinien läpi ja on aina ihan liian söpö. Hän on Nallen uskollinen lemmikki." },
    ],
  },
  news: {
    h: "Liity mukaan!",
    p: "Kuule ensimmäisenä uusista jaksoista, tarinoista ja ystävien seikkailuista. Uutiskirje on tarkoitettu vanhemmille ja huoltajille.",
    label: "Sähköpostiosoite",
    ph: "Sähköpostiosoitteesi",
    btn: "Tilaa uutiskirje",
    consent: "Olen yli 18-vuotias vanhempi tai huoltaja, ja sähköpostiosoitettani saa käyttää uutiskirjeen lähettämiseen. Tilauksen voi perua milloin tahansa.",
    errEmail: "Tarkista sähköpostiosoite – siitä puuttuu jotain.",
    errConsent: "Vahvista ensin, että olet vanhempi tai huoltaja.",
    ok: "Kiitos tilauksesta!",
    fail: "Tilaus ei mennyt perille. Yritä hetken päästä uudelleen.",
    wait: (seconds: number) => `Odota ${seconds} sekuntia ennen uutta lähetystä.`,
  },
};

const en: typeof fi = {
  title: "Different Friends – Lukukroko",
  desc: "Erilaiset Ystävät (Different Friends) – a children's series about Finnish culture, traditions, language and humour. Watch the pilot and meet the friends.",
  skip: "Skip to content",
  menu: "Menu",
  navLabel: "Main menu",
  footLabel: "Footer menu",
  langLabel: "Language",
  credit: "Directed and produced by",
  nav: {
    pilot: "Pilot",
    episodes: "Episodes",
    cast: "Characters",
    news: "Newsletter",
  },
  hero: {
    a: "Different.",
    b: "Awesome.",
    c: "Together!",
    lead: "Welcome to a world of Finnish culture, traditions, language and humour. Every episode is a new adventure full of discoveries, joy and learning together.",
    age: "Suitable for children aged 5 and up.",
    cta1: "Watch the pilot",
    cta2: "Meet the characters",
  },
  pilot: {
    h1: "Episode 1:",
    h2: "Different Friends",
    p: "Meet the friends and join their very first adventure! The pilot episode is out now on YouTube.",
    cta: "Also on YouTube",
    cap: "Different Friends – pilot episode",
  },
  eps: {
    h: "Four new episodes",
    sub: "The adventure continues as the friends travel around Finland.",
    badge: "Coming in 2027",
    list: [
      { tag: "Tampere", title: "Always a part of me", text: "Your home town comes with you, wherever you go." },
      { tag: "Forest", title: "Into the forest – everyone's right!", text: "What can we do in nature, and how do we look after the forest together?" },
      { tag: "Food", title: "From field to table – made with heart", text: "From the field to your plate: where does our food really come from?" },
      { tag: "Kalevala", title: "Väinämöinen's kantele", text: "An old tale, a new tune – the friends discover the magic of the kantele." },
    ],
  },
  cast: {
    h: "Meet the friends",
    sub: "Five different friends, one shared adventure.",
    list: [
      { trait: "Curious and cheerful", text: "Has a solution for every puzzle – sometimes a rather surprising one." },
      { trait: "The inventive one", text: "Always asks “why?” and finds the answer together with the others." },
      { trait: "Calm explorer", text: "Watches, listens and notices what everyone else walks past." },
      { trait: "The best hacker in the forest", text: "Always connected to Wi-Fi! Nalle can fix any tech problem in the whole forest." },
      { trait: "Nalle’s ghost hedgehog", text: "Tottu floats through walls and is always super cute. Nalle’s loyal little pet." },
    ],
  },
  news: {
    h: "Join us!",
    p: "Be the first to hear about new episodes, stories and the friends' adventures. The newsletter is for parents and guardians.",
    label: "Email address",
    ph: "Your email address",
    btn: "Subscribe",
    consent: "I am a parent or guardian over 18, and my email address may be used to send the newsletter. You can unsubscribe at any time.",
    errEmail: "Check the email address – something is missing.",
    errConsent: "First confirm that you are a parent or guardian.",
    ok: "Thanks for subscribing!",
    fail: "The subscription didn't go through. Try again in a moment.",
    wait: (seconds: number) => `Please wait ${seconds} seconds before sending again.`,
  },
};

const TEXTS = { fi, en };

export type Lang = keyof typeof TEXTS;

interface LangState {
  lang: Lang;
  t: typeof fi;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangState>({ lang: "fi", t: fi, setLang: () => {} });

const CHOICE_KEY = "ey-lang-choice";

// Finnish unless the link asks for English (?lang=en) or the visitor picked English before.
function initialLang(): Lang {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(CHOICE_KEY);
  } catch {}
  const pick = new URLSearchParams(window.location.search).get("lang") || saved;
  return pick === "en" ? "en" : "fi";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState(initialLang);
  const t = TEXTS[lang];

  const chooseLang = (next: Lang) => {
    setLang(next);
    try {
      localStorage.setItem(CHOICE_KEY, next);
    } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.desc);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState(null, "", url);
    // Each language version is its own canonical page, as the hreflang links in index.html declare.
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = new URL(`?lang=${lang}`, canonical.href).href;
  }, [lang, t]);

  return <LangContext.Provider value={{ lang, t, setLang: chooseLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
