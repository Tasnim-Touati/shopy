// src/pages/CartPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { previewOrder, submitOrder } from "../api/orderApi";
import toast from "react-hot-toast";
import "./CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showStockDialog, setShowStockDialog] = useState(false);
  const [stockIssues, setStockIssues] = useState([]);

  // Preview order effect
  useEffect(() => {
    if (cart.length === 0) {
      setOrder(null);
      return;
    }

    const fetchPreview = async () => {
      setLoading(true);
      try {
        const data = await previewOrder({
          cart: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        });

        console.log("Preview data:", data); // DEBUG

        // Gère différents formats de réponse
        const orderData = data.data || data;
        setOrder(orderData);
      } catch (err) {
        console.error("Preview error:", err);

        // Fallback: calcul manuel si l'API échoue
        let total = 0;
        const items = cart.map((item) => {
          const subTotal = item.price * item.quantity;
          total += subTotal;
          return {
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            subTotal,
          };
        });
        setOrder({ items, total });

        // Affiche un toast seulement si ce n'est pas un problème de stock
        if (!err.response?.data?.stockIssues) {
          toast.error("Impossible de calculer le total", { duration: 2000 });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [cart]);

  const handleRemove = (productId) => {
    setRemovingId(productId);
    setTimeout(() => {
      removeFromCart(productId);
      setRemovingId(null);
    }, 300);
  };

  const handleCheckout = async () => {
    setIsSubmitting(true);

    try {
      const orderData = await submitOrder({
        cart: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });

      // Gère différents formats de réponse
      const order = orderData.data || orderData;

      toast.success(`Commande confirmée! N° ${order.orderId}`, {
        duration: 5000,
        icon: "✅",
      });

      clearCart();

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Checkout error:", err);

      if (err.response?.data?.stockIssues) {
        const issues = err.response.data.stockIssues;
        setStockIssues(issues);
        setShowStockDialog(true);
      } else {
        toast.error(
          err.response?.data?.message || "Erreur lors de la commande"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProceedWithAvailable = async () => {
    setShowStockDialog(false);
    setIsSubmitting(true);

    try {
      const adjustedCart = cart
        .map((item) => {
          const issue = stockIssues.find((i) => i.productId === item.id);
          if (issue) {
            return {
              productId: item.id,
              quantity: issue.available,
            };
          }
          return {
            productId: item.id,
            quantity: item.quantity,
          };
        })
        .filter((item) => item.quantity > 0);

      const orderData = await submitOrder({ cart: adjustedCart });
      const order = orderData.data || orderData;

      toast.success(`Commande confirmée! N° ${order.orderId}`, {
        duration: 5000,
        icon: "✅",
      });

      clearCart();

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur lors de la commande");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelOrder = () => {
    setShowStockDialog(false);
    setStockIssues([]);
    setIsSubmitting(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="cart-container">
        <div className="page-state-container">
          <div className="spinner"></div>
          <p>Chargement du panier...</p>
        </div>
      </div>
    );
  }

  // Empty cart
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

  // Vérifie que order.items existe
  if (!order.items || !Array.isArray(order.items)) {
    return (
      <div className="cart-container">
        <div className="page-state-container">
          <div className="error-icon">⚠️</div>
          <p className="error-message">Erreur de chargement du panier</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            🔄 Réessayer
          </button>
        </div>
      </div>
    );
  }

  // Cart items
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
                src={cartItem?.image || "/assets/placeholder.jpg"}
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

                <p className="item-subtotal">{item.subTotal.toFixed(2)} €</p>

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
          <span className="total-amount">{order.total.toFixed(2)} €</span>
        </div>
        <button
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Commande en cours..." : "Procéder au paiement 🔒"}
        </button>
      </div>

      {showStockDialog && (
        <div className="stock-dialog-overlay">
          <div className="stock-dialog">
            <h2>⚠️ Stock insuffisant</h2>
            <p>Certains produits n'ont pas le stock demandé :</p>

            <div className="stock-issues-list">
              {stockIssues.map((issue) => {
                const cartItem = cart.find((c) => c.id === issue.productId);
                return (
                  <div key={issue.productId} className="stock-issue-item">
                    <strong>{issue.productName || cartItem?.name}</strong>
                    <div className="stock-info">
                      <span className="requested">
                        Demandé: {issue.requested}
                      </span>
                      <span className="available">
                        Disponible: {issue.available}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="dialog-question">
              Voulez-vous procéder avec les quantités disponibles ?
            </p>

            <div className="dialog-actions">
              <button onClick={handleCancelOrder} className="btn-cancel">
                Non, annuler
              </button>
              <button
                onClick={handleProceedWithAvailable}
                className="btn-confirm"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Traitement..." : "Oui, continuer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;