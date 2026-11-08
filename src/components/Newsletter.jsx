import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);
    setEmail("");
  };

  return (
    <section className="border-t border-line bg-panel" aria-labelledby="newsletter-title">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-6 md:flex-row md:justify-between md:px-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-drip text-2xl">✉</div>
          <div>
            <h2 id="newsletter-title" className="font-display text-xl uppercase tracking-wide">Join the Drip Family</h2>
            <p className="text-xs text-gray-300">Sign up for exclusive drops, discounts and latest updates.</p>
          </div>
        </div>
        {done ? (
          <p className="text-sm font-semibold text-drip">Welcome to the family! 🔥</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-md">
            <label htmlFor="news-email" className="sr-only">Email address</label>
            <input
              id="news-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="min-w-0 flex-1 border border-line bg-ink px-4 py-3 text-sm outline-none focus:border-drip"
            />
            <button className="bg-drip px-6 text-xs font-bold uppercase tracking-wider hover:bg-red-700">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}