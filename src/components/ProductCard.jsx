import { Link } from "react-router-dom";
import ProductImage from "./ProductImage.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist } = useCart();
  const liked = wishlist.includes(product.id);

  return (
    <article className="group relative border border-line bg-panel">
      <Link to={`/product/${product.id}`} className="block">
        <ProductImage src={product.image} alt={product.name} className="aspect-square w-full" />
        <div className="py-3 text-center">
          <h3 className="text-xs font-semibold">{product.name}</h3>
          <p className="mt-1 text-sm font-bold text-drip">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={liked}
        className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 ${liked ? "text-drip" : "text-white"} hover:text-drip`}
      >
        {liked ? "♥" : "♡"}
      </button>
    </article>
  );
}