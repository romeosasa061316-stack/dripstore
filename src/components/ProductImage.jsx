import { useState } from "react";

// Shows the real image from /public/images. If missing, shows a dark styled placeholder.
export default function ProductImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] ${className}`}
      >
        <span className="font-display text-3xl italic text-drip/70">DRIP</span>
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}