import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} ajouté au panier!`, {
      icon: "🛒",
    });
  };

  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img src={product.image} alt={product.name} />
        {product.stock < 5 && product.stock > 0 && (
          <span className="low-stock-badge">Dernières pièces!</span>
        )}
        {product.stock === 0 && (
          <span className="out-of-stock-badge">Rupture</span>
        )}
      </div>

      <div className="card-content">
        <h3>{product.name}</h3>
        <p className="price">{product.price} €</p>
        <p className="stock-info">
          {product.stock > 0 ? (
            <span className="in-stock">✓ En stock</span>
          ) : (
            <span className="out-of-stock">✗ Indisponible</span>
          )}
        </p>

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
