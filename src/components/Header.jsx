import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "./Logo.jsx";
import { useCart } from "../context/CartContext.jsx";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const { cartCount, wishlist } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(query)}`);
    setSearching(false);
    setOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `pb-1 text-[11px] font-semibold uppercase tracking-wider border-b-2 ${
      isActive ? "border-drip text-white" : "border-transparent text-gray-300 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((l) => (
            <NavLink key={l.label} to={l.to} end className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-sm">
          {searching && (
            <form onSubmit={handleSearch} className="hidden sm:block">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                aria-label="Search products"
                className="w-36 border border-line bg-panel px-3 py-1.5 text-xs outline-none focus:border-drip"
              />
            </form>
          )}
          <button onClick={() => setSearching(!searching)} aria-label="Search" className="hover:text-drip">
            ⌕
          </button>
          <Link to="/shop" aria-label="Wishlist" className="hover:text-drip">
            ♡<sup className="ml-0.5 text-[10px] text-drip">{wishlist.length}</sup>
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative hover:text-drip">
            🛒
            <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-drip text-[10px] font-bold">
              {cartCount}
            </span>
          </Link>
          <button
            className="text-xl md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-ink px-4 py-4 md:hidden" aria-label="Mobile navigation">
          <form onSubmit={handleSearch} className="mb-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="w-full border border-line bg-panel px-3 py-2 text-sm outline-none focus:border-drip"
            />
          </form>
          <ul className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.label}>
                <NavLink to={l.to} end onClick={() => setOpen(false)} className="block text-sm font-semibold uppercase tracking-wider">
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}