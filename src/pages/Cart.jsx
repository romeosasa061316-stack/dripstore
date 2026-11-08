import { Link } from "react-router-dom";
import ProductImage from "../components/ProductImage.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { items, removeItem, changeQty, subtotal, cartCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <h1 className="font-display text-3xl uppercase">Your cart is empty</h1>
        <Link to="/shop" className="mt-6 inline-block bg-drip px-8 py-3 text-xs font-bold uppercase">Start shopping</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <h1 className="mb-6 font-display text-4xl uppercase">Cart ({cartCount})</h1>
      <ul className="divide-y divide-line border border-line bg-panel">
        {items.map((i) => (
          <li key={i.key} className="flex gap-4 p-4">
            <ProductImage src={i.image} alt={i.name} className="h-24 w-24 shrink-0" />
            <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
              <div>
                <Link to={`/product/${i.id}`} className="text-sm font-semibold hover:text-drip">{i.name}</Link>
                <p className="text-xs text-gray-400">Size: {i.size}</p>
                <p className="text-sm font-bold text-drip">${i.price.toFixed(2)}</p>
              </div>
              <div className="mt-2 flex items-center gap-4 sm:mt-0">
                <div className="flex items-center border border-line">
                  <button onClick={() => changeQty(i.key, -1)} aria-label="Decrease quantity" className="px-3 py-1">−</button>
                  <span className="w-8 text-center text-sm">{i.qty}</span>
                  <button onClick={() => changeQty(i.key, 1)} aria-label="Increase quantity" className="px-3 py-1">+</button>
                </div>
                <button onClick={() => removeItem(i.key)} className="text-xs text-gray-400 underline hover:text-drip">Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 ml-auto max-w-sm border border-line bg-panel p-5">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span className="font-bold">${subtotal.toFixed(2)}</span>
        </div>
        <p className="mt-1 text-xs text-gray-400">Shipping calculated at checkout.</p>
        <Link to="/checkout" className="mt-4 block bg-drip py-3 text-center text-xs font-bold uppercase tracking-wider hover:bg-red-700">
          Checkout
        </Link>
      </div>
    </div>
  );
}