import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import CategoryTiles from "../components/CategoryTiles.jsx";
import FeaturedDrops from "../components/FeaturedDrops.jsx";
import { products, categories } from "../data/products.js";

const PAGE_SIZE = 8;

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [visible, setVisible] = useState(PAGE_SIZE);
  const category = params.get("category") || "All";
  const q = (params.get("q") || "").toLowerCase();

  // start again at 8 whenever the filter or search changes
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [category, q]);

  const filtered = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  );

  const shown = filtered.slice(0, visible);

  const setCategory = (c) => {
    const next = new URLSearchParams(params);
    if (c === "All") next.delete("category");
    else next.set("category", c);
    setParams(next);
  };

  return (
    <>
      <CategoryTiles />
      <FeaturedDrops />

      <div id="shop" className="mx-auto max-w-7xl px-4 py-4 md:px-6">
        <h1 className="text-center font-display text-4xl uppercase">Shop</h1>
        <div className="mx-auto mt-1 h-0.5 w-20 bg-drip" />

        <div className="my-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by category">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`border px-4 py-2 text-xs font-bold uppercase ${
                category === c ? "border-drip bg-drip" : "border-line hover:border-drip"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {q && <p className="mb-4 text-center text-sm text-gray-400">Results for "{params.get("q")}"</p>}

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-gray-400">No products found.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {shown.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            <div className="mt-8 pb-8 text-center" aria-live="polite">
              <p className="text-xs text-gray-400">Showing {shown.length} of {filtered.length}</p>
              {visible < filtered.length && (
                <button
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="mt-3 border border-drip px-8 py-3 text-xs font-bold uppercase tracking-wider transition hover:bg-drip"
                >
                  Load more
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}