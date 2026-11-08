import { useState } from "react";

const CALLS = [
  { name: "Dumisani Moyo", display: "0785811123", intl: "263785811123" },
  { name: "P. Kampira", display: "0778519264", intl: "263778519264" },
];

const EMAIL = "1primrosekampi@gmail.com";
const WA_TEXT = "Hi Drip, I'd like to order.";

/* Social icons: change the href links to your real pages.
   img = file in public/images/ */
const SOCIALS = [
  { name: "WhatsApp", img: "/images/whatsapp.png", href: `https://wa.me/${CALLS[0].intl}?text=${encodeURIComponent(WA_TEXT)}` },
  { name: "Instagram", img: "/images/instagram.png", href: "https://instagram.com/infinitystreetwears" },
  { name: "TikTok", img: "/images/tiktok.png", href: "https://tiktok.com/@infinitystreetwears" },
  { name: "Facebook", img: "/images/facebook.png", href: "https://facebook.com/infinitystreetwears" },
];

const Icon = ({ children, size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
    {children}
  </svg>
);

const PhoneIcon = () => (
  <Icon><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></Icon>
);
const MailIcon = () => (
  <Icon><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Icon>
);
const PinIcon = () => (
  <Icon><path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></Icon>
);

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const input = "w-full border border-line bg-panel px-3 py-2.5 text-sm outline-none focus:border-drip";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-14">
      <h1 className="text-center font-display text-4xl uppercase">Contact us</h1>
      <div className="mx-auto mt-2 h-0.5 w-20 bg-drip" />
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <section className="border border-line bg-panel p-6 sm:p-8" aria-labelledby="contact-details-title">
          <h2 id="contact-details-title" className="font-display text-2xl uppercase">Get in touch</h2>
          <div className="mt-5 space-y-5 text-sm text-gray-300">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-drip">Call us</p>
              <ul className="mt-2 space-y-3">
                {CALLS.map((c) => (
                  <li key={c.intl} className="flex flex-wrap items-center gap-3">
                    {/* tap to call */}
                    <a href={`tel:+${c.intl}`} className="flex items-center gap-2 transition hover:text-drip">
                      <PhoneIcon />
                      <span>{c.display} {c.name}</span>
                    </a>

                    {/* opens WhatsApp straight to this number */}
                    <a
                      href={`https://wa.me/${c.intl}?text=${encodeURIComponent(WA_TEXT)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp ${c.name}`}
                      className="flex items-center gap-1.5 rounded-sm border border-green-600 px-2.5 py-1 text-[11px] font-bold uppercase text-green-500 transition hover:bg-green-600 hover:text-white"
                    >
                      <img src="/images/whatsapp.png" alt="" className="h-4 w-4 object-contain" /> WhatsApp
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-drip">Email</p>
              <a href={`mailto:${EMAIL}`} className="mt-2 flex items-center gap-2 transition hover:text-drip">
                <MailIcon />
                <span>{EMAIL}</span>
              </a>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-drip">Find us</p>
              <p className="mt-2 flex items-center gap-2">
                <PinIcon />
                <span>@infinitystreetwears GV3</span>
              </p>

              {/* social icons */}
              <div className="mt-4 flex gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="grid h-11 w-11 place-items-center border border-line transition hover:-translate-y-1 hover:border-drip"
                  >
                    <img src={s.img} alt="" className="h-6 w-6 object-contain" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Send us a message">
          {sent ? (
            <p className="border border-line bg-panel p-6 text-center text-drip">Message sent. We'll get back to you soon!</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="c-name" className="mb-1 block text-xs font-bold uppercase">Name</label>
                <input id="c-name" required className={input} />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-1 block text-xs font-bold uppercase">Email</label>
                <input id="c-email" type="email" required className={input} />
              </div>
              <div>
                <label htmlFor="c-msg" className="mb-1 block text-xs font-bold uppercase">Message</label>
                <textarea id="c-msg" rows="5" required className={input} />
              </div>
              <button className="w-full bg-drip py-3 text-xs font-bold uppercase tracking-wider hover:bg-red-700">Send</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}