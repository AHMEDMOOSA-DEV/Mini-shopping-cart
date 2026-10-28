import { Link } from "react-router-dom";
import { formatPrice } from "../components/ProductCard.jsx";
import { useShop } from "../context/ShopContext.jsx";

export default function CartPage() {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useShop();

  return (
    <main className="page-shell cart-page">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR GOOD FINDS</p>
          <h1>Your bag<span className="heading-period">.</span></h1>
        </div>
        <Link className="back-link" to="/products"><span aria-hidden="true">←</span> Keep browsing</Link>
      </div>
      {cart.length === 0 ? (
        <div className="empty-state cart-empty">
          <span className="empty-icon">♡</span>
          <h2>Your bag is taking a little break.</h2>
          <p>Let's find something good to bring home.</p>
          <Link className="button button-dark" to="/products">Find your good thing <span>→</span></Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Items in your bag">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <Link className="cart-item-image" to={`/products/${item.id}`}>
                  <img src={item.image} alt={item.title} />
                </Link>
                <div className="cart-item-info">
                  <p className="product-category">{item.category}</p>
                  <Link to={`/products/${item.id}`}><h2>{item.title}</h2></Link>
                  <p className="cart-unit-price">{formatPrice(item.price)} each</p>
                  <button className="remove-button" type="button" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
                <div className="cart-item-end">
                  <span className="cart-line-price">{formatPrice(item.price * item.quantity)}</span>
                  <div className="quantity-control" aria-label={`Quantity for ${item.title}`}>
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >−</button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                </div>
              </article>
            ))}
          </section>
          <aside className="order-summary">
            <p className="eyebrow">THE LITTLE DETAILS</p>
            <h2>Order summary</h2>
            <div className="summary-row"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{cartTotal >= 50 ? "On us" : "Calculated at checkout"}</span></div>
            <div className="summary-total"><span>Total</span><strong>{formatPrice(cartTotal)}</strong></div>
            <button className="button button-dark checkout-button" type="button" onClick={() => window.alert("Thanks! Checkout is a demo.")}>
              On to checkout <span aria-hidden="true">→</span>
            </button>
            <p className="summary-footnote">✳ &nbsp;A little joy, headed your way.</p>
          </aside>
        </div>
      )}
      <footer className="site-footer">
        <span>Good things, for everyday.</span>
        <span>Made for finding your new favorite.</span>
      </footer>
    </main>
  );
}
