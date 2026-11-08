import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import Newsletter from "./Newsletter.jsx";

const columns = [
  { title: "Shop", links: ["All Products", "New Arrivals", "Best Sellers", "Sale"] },
  { title: "Customer Service", links: ["FAQs", "Shipping & Delivery", "Returns & Exchanges", "Size Guide"] },
  { title: "Company", links: ["About Us", "Our Story", "Careers", "Contact Us"] },
];

export default function Footer() {
  return (
    <footer>
      <Newsletter />
      <div className="border-t border-drip bg-ink">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 md:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-[200px] text-xs text-gray-300">
              Premium streetwear for those who live authentically and dress boldly.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider">{col.title}</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link to="/shop" className="hover:text-drip">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>✉ info@dripclothing.com</li>
              <li>☎ +27 11 123 4567</li>
              <li>⌖ Johannesburg, South Africa</li>
            </ul>
          </div>
        </div>
        <p className="border-t border-line py-4 text-center text-[11px] text-gray-500">
          © 2026 Drip Clothing. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}