import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

const PRODUCTS_URL = "https://fakestoreapi.com/products";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(PRODUCTS_URL, { signal: controller.signal }),
          fetch(`${PRODUCTS_URL}/categories`, { signal: controller.signal }),
        ]);
        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error("The shop is having trouble loading right now.");
        }
        const [productData, categoryData] = await Promise.all([
          productsResponse.json(),
          categoriesResponse.json(),
        ]);
        setProducts(productData);
        setCategories(categoryData);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message || "Could not load products. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadProducts();
    return () => controller.abort();
  }, []);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [products, search, selectedCategory]);

  return (
    <main className="shop-page page-shell">
      <section className="shop-hero">
        <div className="hero-copy">
          <p className="eyebrow">THE EVERYDAY EDIT · NO. 01</p>
          <h1>A good find<br /><span>feels like you.</span></h1>
          <p className="hero-description">
            Thoughtful little upgrades for wherever life takes you.
          </p>
          <a className="button button-dark hero-button" href="#the-edit">
            Explore the edit <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-art" aria-label="Featured home and lifestyle products">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-sun">✳</div>
          <div className="hero-label">GOOD<br />THINGS<br />LIVE HERE</div>
          <div className="hero-sticker">picked<br />with care <span>♥</span></div>
        </div>
      </section>

      <section className="edit-section" id="the-edit">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A FEW OF OUR FAVORITES</p>
            <h2>The good stuff<span className="heading-period">.</span></h2>
          </div>
          <label className="search-field">
            <span className="sr-only">Search products</span>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Find your thing"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        <div className="catalog-controls">
          <div className="category-list" aria-label="Filter by category">
            <button
              className={`category-chip ${selectedCategory === "all" ? "active" : ""}`}
              onClick={() => setSelectedCategory("all")}
              type="button"
            >
              Everything
            </button>
            {categories.map((category) => (
              <button
                className={`category-chip ${selectedCategory === category ? "active" : ""}`}
                key={category}
                onClick={() => setSelectedCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
          {!loading && <span className="item-count">{filteredProducts.length} lovely finds</span>}
        </div>

        {loading ? (
          <div className="product-grid" aria-label="Loading products">
            {Array.from({ length: 8 }, (_, index) => (
              <div className="skeleton-card" key={index}><div /><span /><span /></div>
            ))}
          </div>
        ) : error ? (
          <div className="empty-state">
            <span className="empty-icon">☁</span>
            <h3>Something got in the way.</h3>
            <p>{error}</p>
            <button className="button button-dark" onClick={() => window.location.reload()} type="button">
              Try again
            </button>
          </div>
        ) : filteredProducts.length ? (
          <div className="product-grid">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">⌕</span>
            <h3>No finds just yet.</h3>
            <p>Try another search or browse everything.</p>
            <button
              className="button button-dark"
              onClick={() => { setSearch(""); setSelectedCategory("all"); }}
              type="button"
            >
              Show me everything
            </button>
          </div>
        )}
      </section>
      <footer className="site-footer">
        <span>Good things, for everyday.</span>
        <span>Made for finding your new favorite.</span>
      </footer>
    </main>
  );
}
