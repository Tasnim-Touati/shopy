import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Handle adding a product to the cart
  const handleAddToCart = (e) => {
    // ← Add 'e' parameter
    e.stopPropagation(); // Prevent card click when clicking button
    addToCart(product);
    toast.success(`${product.name} ajouté au panier!`, {
      icon: "🛒",
    });
  };

  return (
    <div
      className="card"
      onClick={() => navigate(`/product/${product.id}`)} // ← Move here
      style={{ cursor: "pointer" }} // ← Move here
    >
      <div className="card-image-wrapper">
        <img src={product.image} alt={product.name} />

        {/* Low stock warning badge */}
        {product.stock < 5 && product.stock > 0 && (
          <span className="low-stock-badge">Dernières pièces!</span>
        )}

        {/* Out of stock badge */}
        {product.stock === 0 && (
          <span className="out-of-stock-badge">Rupture</span>
        )}
      </div>

      <div className="card-content">
        {/* Product name */}
        <h3>{product.name}</h3>

        {/* Price display */}
        <p className="price">{product.price} €</p>

        {/* Stock info */}
        <p className="stock-info">
          {product.stock > 0 ? (
            <span className="in-stock">En stock</span>
          ) : (
            <span className="out-of-stock">Indisponible</span>
          )}
        </p>

        {/* Add to cart button */}
        <button
          disabled={product.stock === 0}
          onClick={handleAddToCart}
          className="add-to-cart-btn"
        >
          {product.stock === 0 ? "Indisponible" : "Ajouter au panier"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
