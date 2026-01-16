import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { previewOrder } from "../api/orderApi";
import "./CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    if (cart.length === 0) {
      setOrder(null);
      return;
    }

    setLoading(true);
    previewOrder({
      cart: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    })
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [cart]);

  const handleRemove = (productId) => {
    setRemovingId(productId);
    setTimeout(() => {
      removeFromCart(productId);
      setRemovingId(null);
    }, 300);
  };

  if (loading)
    return (
      <div className="cart-container">
        <p>Chargement...</p>
      </div>
    );

  if (!order || cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart-state">
          <h2>Mon Panier</h2>
          <div className="empty-cart-icon">🛒</div>
          <p className="empty-cart">Votre panier est vide</p>
          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/")}
          >
            Continuer mes achats
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>
          Mon Panier ({cart.length} article{cart.length > 1 ? "s" : ""})
        </h2>
        <div className="header-actions">
          <button
            className="continue-shopping-link"
            onClick={() => navigate("/")}
          >
            ← Continuer mes achats
          </button>
          <button className="clear-cart-btn" onClick={clearCart}>
            Vider le panier
          </button>
        </div>
      </div>

      <div className="cart-items">
        {order.items.map((item) => {
          const cartItem = cart.find((c) => c.id === item.productId);
          return (
            <div
              key={item.productId}
              className={`cart-item ${
                removingId === item.productId ? "removing" : ""
              }`}
            >
              <img
                src={cartItem?.image || "./assets/placeholder.jpg"}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="item-price">{item.price} € / unité</p>
              </div>

              <div className="item-controls">
                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <p className="item-subtotal">{item.subTotal} €</p>

                <button
                  onClick={() => handleRemove(item.productId)}
                  className="remove-btn"
                  title="Retirer du panier"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <div className="total-row">
          <span>Total</span>
          <span className="total-amount">{order.total} €</span>
        </div>
        <button className="checkout-btn">Procéder au paiement 🔒</button>
      </div>
    </div>
  );
};

export default CartPage;
