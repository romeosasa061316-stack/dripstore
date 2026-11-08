import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products.js";
import LazyImage from "./LazyImage.jsx";
import { ChevronL, ChevronR } from "./Icons.jsx";

// Change this if your product page uses a different route.
const productLink = (p) => `/product/${p.id}`;

const featured = products.filter((p) => p.bestSeller);

export default function FeaturedDrops() {
  const track = useRef(null);
  const raf = useRef(0);
  const [active, setActive] = useState(0);

  // Find the card closest to the centre while scrolling
  const onScroll = useCallback(() => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const root = track.current;
      if (!root) return;
      const mid = root.scrollLeft + root.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(root.children).forEach((el, i) => {
        const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      setActive(best);
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const goTo = (i) => {
    const root = track.current;
    const el = root?.children[i];
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.scrollTo({
      left: el.offsetLeft + el.offsetWidth / 2 - root.clientWidth / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  };
  const step = (d) => goTo(Math.min(Math.max(active + d, 0), featured.length - 1));

  if (featured.length === 0) return null;
  const current = featured[active] || featured[0];

  return (
    <section
      aria-label="Featured drops"
      className="relative overflow-hidden border-b border-line py-12"
      style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(217,30,37,.22), transparent 65%)" }}
    >
      <h2 className="text-center font-display text-4xl uppercase">Featured drops</h2>
      <div className="mx-auto mt-1 h-0.5 w-20 bg-drip" />

      <div className="relative mt-6">
        <button aria-label="Previous" onClick={() => step(-1)}
          className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/60 transition hover:bg-drip sm:grid">
          <ChevronL />
        </button>

        <div
          ref={track}
          onScroll={onScroll}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured products"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
          }}
          className="no-scrollbar relative flex snap-x snap-mandatory gap-5 overflow-x-auto px-[14vw] py-8 outline-none focus-visible:ring-2 focus-visible:ring-drip sm:px-[calc(50%-150px)]"
        >
          {featured.map((p, i) => (
            <Link
              key={p.id}
              to={productLink(p)}
              aria-label={`${p.name}, $${p.price.toFixed(2)}`}
              onClick={(e) => { if (i !== active) { e.preventDefault(); goTo(i); } }}
              className={`block w-[72vw] shrink-0 snap-center overflow-hidden border bg-panel transition duration-500 motion-reduce:transition-none sm:w-[300px] ${
                i === active ? "scale-100 border-drip opacity-100" : "scale-90 border-line opacity-50"
              }`}
            >
              <LazyImage src={p.image} alt={p.name} ratio="4 / 5" eager={i < 3} />
            </Link>
          ))}
        </div>

        <button aria-label="Next" onClick={() => step(1)}
          className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/60 transition hover:bg-drip sm:grid">
          <ChevronR />
        </button>
      </div>

      <div key={current.id} aria-live="polite" className="fade-up mt-2 px-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-drip">{current.category}</p>
        <h3 className="mt-1 font-display text-3xl uppercase">{current.name}</h3>
        <p className="mt-1 text-xl">${current.price.toFixed(2)}</p>
        <Link to={productLink(current)}
          className="mt-4 inline-block bg-drip px-8 py-3 text-xs font-bold uppercase tracking-wider hover:bg-red-700">
          View product
        </Link>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {featured.map((p, i) => (
          <button key={p.id} aria-label={`Show ${p.name}`} onClick={() => goTo(i)}
            className="h-2 rounded-full transition-all duration-300"
            style={{ width: i === active ? 28 : 8, background: i === active ? "#d91e25" : "#555" }} />
        ))}
      </div>
    </section>
  );
}