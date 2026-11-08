import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      aria-label="Infinity Streetwear home"
      className="flex items-center"
    >
      <img src="/images/infinityLogo.png" alt="Infinity Streetwear" className="h-11 w-11 object-cover sm:h-12 sm:w-12" />
    </Link>
  );
}