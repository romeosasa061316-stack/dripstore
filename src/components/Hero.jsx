import { Link } from "react-router-dom";
import ProductImage from "./ProductImage.jsx";

export default function Hero() {
  return (
    <section className="border-b border-line bg-ink">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-10 md:grid-cols-2 md:px-6 md:py-0">
        <div className="md:py-16">
          <p className="text-sm font-bold uppercase tracking-wider text-drip">Wear your attitude</p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl lg:text-7xl">
            Stay Fresh.
            <span className="block text-drip">Stay Drippy.</span>
          </h1>
          <p className="mt-5 max-w-xs text-sm text-gray-200">
            Premium quality streetwear for those who set the trends, not follow them.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/shop" className="bg-drip px-7 py-3 text-xs font-bold uppercase tracking-wider hover:bg-red-700">
              Shop Now
            </Link>
            <Link to="/shop" className="border border-drip px-7 py-3 text-xs font-bold uppercase tracking-wider hover:bg-drip/10">
              Explore Collection
            </Link>
          </div>
        </div>
        <ProductImage src="/images/home.png" alt="Streetwear collection at the Drip store" className="h-72 w-full sm:h-96 md:h-[420px]" />
      </div>
    </section>
  );
}