import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductImage from "../components/ProductImage.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <p className="mb-4">Product not found.</p>
        <Link to="/shop" className="text-drip underline">Back to shop</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    if (!size) return;
    addToCart(product, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="grid gap-8 md:grid-cols-2">
        <ProductImage src={product.image} alt={product.name} className="aspect-square w-full border border-line" />

        <div>
          <p className="text-xs font-bold uppercase text-drip">{product.category}</p>
          <h1 className="mt-1 font-display text-4xl uppercase">{product.name}</h1>
          <p className="mt-2 text-2xl font-bold text-drip">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-sm text-gray-300">{product.description}</p>
          <p className="mt-4 text-xs text-gray-400">Colour: {product.colors.join(", ")}</p>

          <fieldset className="mt-5">
            <legend className="mb-2 text-xs font-bold uppercase">Size</legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`min-w-12 border px-3 py-2 text-xs font-bold ${size === s ? "border-drip bg-drip" : "border-line hover:border-drip"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-xs font-bold uppercase">Qty</span>
            <div className="flex items-center border border-line">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity" className="px-3 py-2">−</button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity" className="px-3 py-2">+</button>
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={!size}
            className="mt-6 w-full bg-drip py-3 text-xs font-bold uppercase tracking-wider hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:px-12"
          >
            {added ? "Added ✓" : size ? "Add to cart" : "Select a size"}
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 text-center font-display text-2xl uppercase">You may also like</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}