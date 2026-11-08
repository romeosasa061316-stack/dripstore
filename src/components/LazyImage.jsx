import { useEffect, useRef, useState } from "react";

const FIT = { cover: "object-cover", contain: "object-contain" };

/* Loads the image only when it is near the screen.
   The box keeps its shape while loading, so the page never jumps. */
export default function LazyImage({ src, alt = "", ratio = "4 / 5", fit = "cover", eager = false, className = "" }) {
  const box = useRef(null);
  const [show, setShow] = useState(eager);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = box.current;
    if (!el || !("IntersectionObserver" in window)) { setShow(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShow(true); io.disconnect(); } },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show]);

  return (
    <div ref={box} className={`relative overflow-hidden bg-panel ${className}`} style={{ aspectRatio: ratio }}>
      {!loaded && !failed && <div className="absolute inset-0 animate-pulse bg-white/5" />}
      {show && !failed && (
        <img
          src={src}
          alt={alt}
          decoding="async"
          loading={eager ? "eager" : "lazy"}
          draggable="false"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full ${FIT[fit]} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
      {failed && <div className="absolute inset-0 grid place-items-center text-xs text-gray-500">Image unavailable</div>}
    </div>
  );
}