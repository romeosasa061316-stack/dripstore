import { useEffect, useRef, useState } from 'react';
import { ChevronL, ChevronR } from './Icons';

/* Edit this list to match your real hoodies.
   img  = file in public/images/hoodies/
   bg   = background gradient (match it to the hoodie colour) */
const HOODIES = [
  { id: 'red', name: 'Red Drip Hoodie', img: '/images/hoodies/red.png',
    color: '#c40f1c', shade: '#7d0911', ink: '#ffffff',
    bg: 'linear-gradient(135deg,#e0101e 0%,#4a0509 100%)' },
  { id: 'black', name: 'Black Drip Hoodie', img: '/images/hoodies/black.png',
    color: '#151515', shade: '#000000', ink: '#e0101e',
    bg: 'linear-gradient(135deg,#2c2c2c 0%,#050505 100%)' },
  { id: 'white', name: 'White Drip Hoodie', img: '/images/hoodies/white.png',
    color: '#f2efe9', shade: '#c9c4b8', ink: '#111111',
    bg: 'linear-gradient(135deg,#7a0a12 0%,#120305 100%)' },
  { id: 'grey', name: 'Grey Drip Hoodie', img: '/images/hoodies/grey.png',
    color: '#7a7a7a', shade: '#4d4d4d', ink: '#e0101e',
    bg: 'linear-gradient(135deg,#4a0810 0%,#0a0a0a 100%)' },
];
const SIZES = ['S', 'M', 'L', 'XL'];

/* Drawn hoodie, shown only if a photo file is missing */
function HoodieArt({ color, shade, ink }) {
  return (
    <svg viewBox="0 0 200 210" className="h-full w-full" aria-hidden="true">
      <g transform="translate(0,14) scale(2)" strokeLinejoin="round">
        <path d="M35 20 L50 26 L65 20 L84 32 L92 60 L80 64 L76 52 L76 90 L24 90 L24 52 L20 64 L8 60 L16 32 Z" fill={color} stroke={shade} strokeWidth=".8" />
        <path d="M36 20 C36 6 64 6 64 20 C64 32 36 32 36 20 Z" fill={shade} />
        <path d="M34 70 H66 L70 84 H30 Z" fill={shade} opacity=".55" />
        <text x="50" y="58" textAnchor="middle" fontSize="9" fill={ink} style={{ fontFamily: "'Permanent Marker', cursive" }}>DRIP</text>
      </g>
    </svg>
  );
}

function Hoodie({ item }) {
  const [bad, setBad] = useState(false);
  if (bad) return <HoodieArt {...item} />;
  return (
    <img
      src={item.img}
      alt={item.name}
      draggable="false"
      onError={() => setBad(true)}
      className="h-full w-full object-contain"
      style={{ filter: 'drop-shadow(0 24px 24px rgba(0,0,0,.55))' }}
    />
  );
}

export default function ColorDrop({ ready = true }) {
  const [i, setI] = useState(0);
  const [thumb, setThumb] = useState(1);
  const [leaving, setLeaving] = useState(null);
  const [size, setSize] = useState('M');
  const timer = useRef(null);
  const busy = leaving !== null;
  const item = HOODIES[i];

  useEffect(() => () => clearTimeout(timer.current), []);

  const goTo = (n) => {
    if (busy || n === i) return;
    const from = i;
    setLeaving(from);
    setI(n);
    timer.current = setTimeout(() => { setLeaving(null); setThumb(from); }, 950);
  };
  const step = (d) => goTo((i + d + HOODIES.length) % HOODIES.length);

  return (
    <section id="colours" className="show relative overflow-hidden" style={{ height: 'min(100vh, 760px)', minHeight: 620 }}>
      {HOODIES.map((h, k) => (
        <div key={h.id} className={`show-bg ${k === i ? 'on' : ''}`} style={{ background: h.bg }} />
      ))}

      {/* left copy */}
      <div className={`absolute left-6 top-14 z-10 max-w-[17rem] transition-opacity duration-500 md:left-16 md:top-1/3 ${busy ? 'opacity-10' : ''}`}>
        <h2 className="f-display text-4xl leading-none md:text-6xl">One hoodie.<br />Four ways to drip.</h2>
        <p className="mt-4 max-w-xs text-sm md:text-base">
          Heavyweight fleece, boxy fit, built to be worn loud. Pick your colour.
        </p>
        <a href="#shop" className="btn-red mt-6">Shop this hoodie</a>
      </div>

      {/* right: price + size */}
      <div className={`absolute right-6 top-14 z-10 text-right transition-opacity duration-500 md:right-16 md:top-1/3 ${busy ? 'opacity-10' : ''}`}>
        <p className="f-label text-sm">{item.name}</p>
        <p className="f-display text-4xl md:text-5xl">$59.99</p>
        <p className="f-display text-xl line-through opacity-60 md:text-2xl">$79.99</p>
        <p className="f-label mt-3 text-xs">Choose your size</p>
        <div className="mt-2 flex justify-end gap-2">
          {SIZES.map((s) => (
            <button key={s} onClick={() => setSize(s)} aria-pressed={size === s}
              className="f-label grid h-9 w-9 place-items-center rounded-full border text-xs transition"
              style={size === s ? { background: '#fff', color: '#000', borderColor: '#fff' } : { background: '#000', borderColor: '#555' }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* hoodie stage */}
      {ready && (
        <div className="absolute left-1/2 top-[52%] z-[2] aspect-[1/1.05] w-[62vw] max-w-[360px] -translate-x-1/2 -translate-y-1/2 md:w-[30vw]">
          <div className={`floor ${busy ? 'busy' : ''}`} />
          {leaving !== null && (
            <div key={`out-${leaving}`} className="shirt leave"><Hoodie item={HOODIES[leaving]} /></div>
          )}
          <div key={item.id} className="shirt enter"><Hoodie item={item} /></div>
        </div>
      )}

      {/* arrows */}
      <div className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        <button aria-label="Previous colour" onClick={() => step(-1)} className="grid h-10 w-10 place-items-center rounded-full bg-black/50 transition hover:bg-red-600"><ChevronL /></button>
        <button aria-label="Next colour" onClick={() => step(1)} className="grid h-10 w-10 place-items-center rounded-full bg-black/50 transition hover:bg-red-600"><ChevronR /></button>
      </div>

      {/* thumbnail = the hoodie that just left */}
      {!busy && (
        <button key={thumb} aria-label={`Switch to ${HOODIES[thumb].name}`} onClick={() => goTo(thumb)}
          className="thumb-pop absolute bottom-16 right-6 z-10 h-20 w-20 transition hover:scale-110 md:bottom-20 md:right-16">
          <Hoodie item={HOODIES[thumb]} />
        </button>
      )}

      <p className="f-mark absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center text-xl md:text-2xl">
        Drip better. Feel better.
      </p>
    </section>
  );
}