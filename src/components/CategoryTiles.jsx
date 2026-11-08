import { Link } from "react-router-dom";

export default function CategoryTiles() {
  return (
    <section aria-label="Combo outfits" className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <div className="flex flex-col items-start justify-between gap-4 border border-line bg-panel p-5 sm:flex-row sm:items-center sm:p-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-drip">The complete look</p>
          <h2 className="mt-2 font-display text-2xl uppercase sm:text-3xl">Combo outfits</h2>
          <p className="mt-1 text-sm text-gray-300">We dress you completely. Find your full fit.</p>
        </div>
        <Link
          to="/shop"
          className="shrink-0 bg-drip px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-red-700"
        >
          Check our combo outfits
        </Link>
      </div>
    </section>
  );
}