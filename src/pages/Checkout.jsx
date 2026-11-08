import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const fields = [
  { name: "name", label: "Full name", type: "text", full: true },
  { name: "email", label: "Email", type: "email", full: true },
  { name: "address", label: "Address", type: "text", full: true },
  { name: "city", label: "City", type: "text" },
  { name: "phone", label: "Phone", type: "tel" },
];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 5;

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="py-24 text-center">
        <h1 className="font-display text-4xl uppercase text-drip">Order placed!</h1>
        <p className="mt-2 text-sm text-gray-300">Thanks for shopping with Drip. (Demo checkout, no payment taken.)</p>
        <Link to="/shop" className="mt-6 inline-block bg-drip px-8 py-3 text-xs font-bold uppercase">Continue shopping</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="mb-4">Your cart is empty.</p>
        <Link to="/shop" className="text-drip underline">Go to shop</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr] md:px-6">
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <h1 className="font-display text-4xl uppercase sm:col-span-2">Checkout</h1>
        {fields.map((f) => (
          <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
            <label htmlFor={f.name} className="mb-1 block text-xs font-bold uppercase">{f.label}</label>
            <input id={f.name} name={f.name} type={f.type} required className="w-full border border-line bg-panel px-3 py-2.5 text-sm outline-none focus:border-drip" />
          </div>
        ))}
        <button className="bg-drip py-3 text-xs font-bold uppercase tracking-wider hover:bg-red-700 sm:col-span-2">Place order</button>
      </form>

      <aside className="h-fit border border-line bg-panel p-5">
        <h2 className="mb-3 font-display text-xl uppercase">Order summary</h2>
        <ul className="space-y-2 text-sm">
          {items.map((i) => (
            <li key={i.key} className="flex justify-between">
              <span>{i.name} ({i.size}) × {i.qty}</span>
              <span>${(i.price * i.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1 border-t border-line pt-3 text-sm">
          <p className="flex justify-between"><span>Shipping</span><span>{shipping ? `$${shipping.toFixed(2)}` : "Free"}</span></p>
          <p className="flex justify-between font-bold"><span>Total</span><span className="text-drip">${(subtotal + shipping).toFixed(2)}</span></p>
        </div>
      </aside>
    </div>
  );
}