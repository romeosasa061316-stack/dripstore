import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";
import { products } from "../data/products.js";

export default function BestSellers() {
  const best = products.filter((p) => p.bestSeller);

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-6" aria-labelledby="best-title">
      <div className="relative mb-6 text-center">
        <h2 id="best-title" className="font-display text-3xl uppercase">Best Sellers</h2>
        <div className="mx-auto mt-1 h-0.5 w-20 bg-drip" />
        <Link to="/shop" className="absolute right-0 top-2 hidden border border-drip px-3 py-1 text-[10px] font-bold uppercase text-drip hover:bg-drip hover:text-white sm:block">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {best.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}