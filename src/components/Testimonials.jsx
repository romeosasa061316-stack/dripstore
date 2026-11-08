const reviews = [
  { name: "Jayden M.", place: "Johannesburg, ZA", text: "The quality is amazing! Drip Clothing never misses. My go to brand for streetwear." },
  { name: "Lethabo K.", place: "Cape Town, ZA", text: "Fast delivery, great fit and even better style. 100% recommended!" },
  { name: "Tinashe R.", place: "Harare, ZW", text: "Every piece I've bought turns heads. Drip is different." },
];

export default function Testimonials() {
  return (
    <section className="border-y border-line bg-panel py-10" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 id="reviews-title" className="mb-6 text-center font-display text-3xl uppercase">
          What our <span className="text-drip">customers</span> say
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="border border-line bg-ink p-5">
              <span className="font-display text-4xl leading-none text-drip" aria-hidden="true">“</span>
              <blockquote className="mt-1 text-sm text-gray-200">{r.text}</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-drip text-xs font-bold">
                  {r.name[0]}
                </span>
                <span className="text-xs">
                  <span className="block font-semibold"> {r.name}</span>
                  <span className="text-drip">{r.place}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}