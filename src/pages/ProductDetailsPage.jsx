import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatPrice } from "../components/ProductCard.jsx";
import { useShop } from "../context/ShopContext.jsx";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useShop();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("We couldn't find that item.");
        const data = await response.json();
        if (!data?.id) throw new Error("We couldn't find that item.");
        setProduct(data);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message || "Could not load this item.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadProduct();
    return () => controller.abort();
  }, [id]);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  if (loading) {
    return <main className="page-shell detail-loading"><div className="loading-dot" />Finding your good thing...</main>;
  }
  if (error || !product) {
    return (
      <main className="page-shell empty-state detail-error">
        <span className="empty-icon">☁</span>
        <h2>We couldn't find that item.</h2>
        <p>{error}</p>
        <Link className="button button-dark" to="/products">Back to the shop</Link>
      </main>
    );
  }

  return (
    <main className="page-shell detail-page">
      <Link to="/products" className="back-link"><span aria-hidden="true">←</span> Back to the edit</Link>
      <section className="detail-layout">
        <div className="detail-image-wrap">
          <span className="detail-image-badge">A GOOD FIND</span>
          <img src={product.image} alt={product.title} className="detail-image" />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <div className="detail-rating">
            <span aria-label={`${product.rating?.rate ?? 0} out of 5 stars`}>★★★★★</span>
            <span>{product.rating?.rate ?? "New"} · {product.rating?.count ?? 0} reviews</span>
          </div>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <p className="detail-description">{product.description}</p>
          <button className="button button-dark add-button" type="button" onClick={handleAdd}>
            {added ? "Added to your bag ✓" : "Add to bag"}
            {!added && <span>{formatPrice(product.price)}</span>}
          </button>
          <p className="shipping-note"><span>✳</span> Good things ship free on orders over $50.</p>
          <div className="detail-perks">
            <span>↻ &nbsp;Easy 30-day returns</span>
            <span>♡ &nbsp;Picked with care</span>
          </div>
        </div>
      </section>
    </main>
  );
}
