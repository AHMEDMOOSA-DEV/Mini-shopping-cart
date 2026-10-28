import { Link } from "react-router-dom";

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export default function ProductCard({ product, index = 0 }) {
  return (
    <Link
      className="product-card"
      to={`/products/${product.id}`}
      style={{ "--card-delay": `${Math.min(index, 8) * 55}ms` }}
    >
      <div className="product-image-wrap">
        <img className="product-image" src={product.image} alt={product.title} loading="lazy" />
        <span className="quick-view">View item <span aria-hidden="true">↗</span></span>
      </div>
      <div className="product-card-info">
        <div>
          <p className="product-category">{product.category}</p>
          <h2>{product.title}</h2>
        </div>
        <span className="product-price">{formatPrice(product.price)}</span>
      </div>
    </Link>
  );
}
