export default function About() {
  return (
    <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:px-6 md:py-16">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-drip">Our story</p>
        <h1 className="mt-3 font-display text-4xl uppercase sm:text-5xl">About <span className="text-drip">Drip</span></h1>
        <div className="mt-2 h-0.5 w-20 bg-drip" />
        <p className="mt-6 text-gray-300">
          Drip Clothing was born on the streets of GlenView 3 from one idea: fashion should be a statement of who you are.
          We make premium streetwear that is bold, durable and made for people who set the trends, not follow them.
        </p>
        <p className="mt-4 text-gray-300">
          Every hoodie, tee, sneaker and jacket is designed in house and built to last.
          Wear your attitude. Stay fresh. Stay drippy.
        </p>
      </div>
      <div className="overflow-hidden border border-line bg-panel">
        <img
          src="/images/infinityLogo.png"
          alt="Infinity Streetwear logo"
          className="aspect-square w-full object-cover"
        />
      </div>
    </div>
  );
}
