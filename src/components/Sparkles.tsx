// Twinkling four-point stars (from the logo), scattered over the empty space of the section they are placed in.
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useLang } from "../i18n";

const OBSTACLES = "h1,h2,p,a,span,button,img,form,iframe,.ep,.friend,.pilot,.news,.phone,.badge,.lang";

interface Star {
  size: number;
  x: number;
  y: number;
  delay: number;
}

function scatter(section: HTMLElement, seed: number): Star[] {
  // Seeded instead of Math.random(), so each re-layout puts the stars back in the same spots.
  let state = seed;
  const random = () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };

  const box = section.getBoundingClientRect();
  const taken = Array.from(section.querySelectorAll(OBSTACLES), (el) => {
    const r = el.getBoundingClientRect();
    return [r.left - box.left - 14, r.top - box.top - 14, r.right - box.left + 14, r.bottom - box.top + 14];
  });
  const isFree = (x: number, y: number, size: number) =>
    taken.every(([left, top, right, bottom]) => x + size <= left || x >= right || y + size <= top || y >= bottom);

  const stars: Star[] = [];
  const count = Math.max(5, Math.round((box.width * box.height) / 70000));
  for (let i = 0; i < count; i++) {
    const size = random() < 0.25 ? 24 + Math.round(random() * 16) : 8 + Math.round(random() * 12);
    for (let attempt = 0; attempt < 40; attempt++) {
      const x = random() * (box.width - size);
      const y = random() * (box.height - size);
      if (isFree(x, y, size)) {
        stars.push({ size, x, y, delay: random() * 3.2 });
        break;
      }
    }
  }
  return stars;
}

function Sparkles() {
  const { lang } = useLang();
  const layer = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);

  // Placed again when the section resizes, the fonts finish loading or a language switch moves the text.
  useEffect(() => {
    const section = layer.current!.parentElement!;
    const seed = 7 + Array.from(document.querySelectorAll("section, footer")).indexOf(section);
    let timer = 0;
    const place = () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => setStars(scatter(section, seed)), 150);
    };
    const observer = new ResizeObserver(place);
    observer.observe(section);
    document.fonts?.ready.then(place);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [lang]);

  return (
    <div className="deco" aria-hidden="true" ref={layer}>
      {stars.map((star, i) => (
        <i
          key={i}
          className="spark"
          style={{ "--s": `${star.size}px`, "--d": `${star.delay.toFixed(2)}s`, left: star.x, top: star.y } as CSSProperties}
        />
      ))}
    </div>
  );
}

export default Sparkles;
