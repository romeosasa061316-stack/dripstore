import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronL, ChevronR } from './Icons';

// Your photos live in public/images/. Change a file name here to swap a photo.
const CATS = [
  { name: 'Jeans',      img: '/images/jean.png',        tint: '#1d3157' },
  { name: 'Hoodies',    img: '/images/hood.png',        tint: '#4a4a4a' },
  { name: 'T-Shirts',   img: '/images/shirts.png',      tint: '#7a1018' },
  { name: 'Sneakers',   img: '/images/sneaks.png',      tint: '#3d3a30' },
  { name: 'Jackets',    img: '/images/jacket1.png',     tint: '#23406b' },
  { name: 'Bags',       img: '/images/bag1.png',        tint: '#2a2a2a' },
  { name: 'Tracksuits', img: '/images/Tracksuite1.png', tint: '#5a1a1a' },
  { name: 'Bottoms',    img: '/images/bottom.png',      tint: '#8a1a0f' },
  { name: 'Slides',     img: '/images/Y3slides.png',    tint: '#8a0a12' },
  { name: 'Caps',       img: '/images/cap1.png',        tint: '#2b2f6b' },
];

function Face({ cat, small = false }) {
  const [bad, setBad] = useState(false);
  return (
    <div className="relative h-full w-full overflow-hidden border" style={{ borderColor: '#3a1418', background: '#111' }}>
      {!bad ? (
        <img src={cat.img} alt="" onError={() => setBad(true)} className="h-full w-full object-cover" />
      ) : (
        <div className="grid h-full w-full place-items-center" style={{ background: `linear-gradient(160deg, ${cat.tint}, #0a0a0a)` }}>
          <span className={`f-display text-center opacity-60 ${small ? 'text-xs' : 'text-3xl'}`}>{cat.name}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
      {!small && <h3 className="f-display absolute bottom-4 left-4 text-3xl md:text-4xl">{cat.name}</h3>}
    </div>
  );
}

export default function CategoryStage() {
  const [i, setI] = useState(0);
  const [thumb, setThumb] = useState(1);
  const [leaving, setLeaving] = useState(null);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);
  const touchX = useRef(null);
  const busy = leaving !== null;
  const cat = CATS[i];

  useEffect(() => () => clearTimeout(timer.current), []);

  const goTo = (n) => {
    if (busy || n === i) return;
    const from = i;
    setLeaving(from);
    setI(n);
    timer.current = setTimeout(() => { setLeaving(null); setThumb(from); }, 950);
  };
  const step = (d) => goTo((i + d + CATS.length) % CATS.length);

  // autoplay
  useEffect(() => {
    if (paused || busy) return;
    const t = setTimeout(() => step(1), 5200);
    return () => clearTimeout(t);
  }, [i, paused, busy]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      className="spot relative h-[640px] overflow-hidden"
      style={{ background: '#0a0a0a' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const d = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(d) > 50) step(d < 0 ? 1 : -1);
      }}
    >
      {/* tinted backgrounds crossfade */}
      {CATS.map((c, k) => (
        <div key={c.name} className={`spot-bg ${k === i ? 'on' : ''}`}
          style={{ background: `radial-gradient(ellipse at 55% 45%, ${c.tint} 0%, #0a0a0a 68%)` }} />
      ))}

      {/* ghost word */}
      <div key={cat.name} className="spot-ghost f-display" aria-hidden="true">{cat.name}</div>

      {/* category list */}
      <nav aria-label="Categories"
        className="absolute left-0 right-0 top-4 z-10 flex gap-3 overflow-x-auto px-4 md:left-10 md:right-auto md:top-1/2 md:-translate-y-1/2 md:flex-col md:gap-1 md:overflow-visible md:px-0">
        {CATS.map((c, k) => (
          <button key={c.name} onClick={() => goTo(k)} aria-current={k === i}
            className={`f-display whitespace-nowrap border-l-2 pl-3 text-lg transition-all duration-300 md:text-2xl ${
              k === i ? 'text-white md:translate-x-2' : 'border-transparent text-white/40 hover:text-white'
            }`}
            style={k === i ? { borderColor: 'var(--red, #d91e25)' } : undefined}>
            {c.name}
          </button>
        ))}
      </nav>

      {/* card stage */}
      <div className="absolute left-1/2 top-1/2 z-[2] aspect-[3/4] w-[62vw] max-w-[320px] -translate-x-1/2 -translate-y-1/2 md:w-[24vw]">
        <div className={`spot-floor ${busy ? 'busy' : ''}`} />
        {leaving !== null && (
          <div key={`out-${leaving}`} className="spot-card leave">
            <Face cat={CATS[leaving]} />
          </div>
        )}
        <div key={cat.name} className="spot-card enter">
          <span className="spot-cord" />
          <span className="spot-pin" />
          <Face cat={cat} />
        </div>
      </div>

      {/* info */}
      <div className={`absolute bottom-6 left-4 z-10 transition-opacity duration-500 md:bottom-auto md:left-auto md:right-12 md:top-1/3 md:text-right ${busy ? 'opacity-10' : ''}`}>
        <p className="f-label text-sm">{String(i + 1).padStart(2, '0')} / {String(CATS.length).padStart(2, '0')}</p>
        <h2 className="f-display mb-3 hidden text-5xl md:block">{cat.name}</h2>
        <Link to={`/shop?category=${encodeURIComponent(cat.name)}`} className="btn-red">Shop now</Link>
      </div>

      {/* arrows */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3 md:bottom-8">
        <button aria-label="Previous category" onClick={() => step(-1)} className="grid h-10 w-10 place-items-center rounded-full bg-black/50 transition hover:bg-red-600"><ChevronL /></button>
        <button aria-label="Next category" onClick={() => step(1)} className="grid h-10 w-10 place-items-center rounded-full bg-black/50 transition hover:bg-red-600"><ChevronR /></button>
      </div>

      {/* thumbnail = the card that just left */}
      {!busy && (
        <button key={thumb} aria-label={`Show ${CATS[thumb].name}`} onClick={() => goTo(thumb)}
          className="spot-pop absolute bottom-6 right-4 z-10 aspect-[3/4] w-20 transition hover:scale-110 md:bottom-8 md:right-12">
          <Face cat={CATS[thumb]} small />
        </button>
      )}
    </section>
  );
}