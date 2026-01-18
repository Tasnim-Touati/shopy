import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to top when product changes
    window.scrollTo(0, 0);

    setLoading(true);
    fetch(`http://localhost:3001/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Produit introuvable");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]); // Re-fetch when ID changes

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} ajouté au panier!`, {
      icon: "🛒",
    });
  };

  const handleRelatedProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-container">
        <div className="error-state">
          <h2>😕 Produit introuvable</h2>
          <p>{error || "Ce produit n'existe pas"}</p>
          <button onClick={() => navigate("/")} className="back-btn">
            ← Retour aux produits
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate("/")} className="back-btn-top">
        ← Retour aux produits
      </button>

      <div className="product-detail-card">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} />

          {product.stock < 5 && product.stock > 0 && (
            <span className="badge badge-warning">Dernières pièces!</span>
          )}
          {product.stock === 0 && (
            <span className="badge badge-danger">Rupture de stock</span>
          )}
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>

          <div className="product-price-section">
            <span className="product-price">{product.price} €</span>
            <span className="product-stock">
              {product.stock > 0 ? (
                <span className="in-stock">
                  ✓ En stock ({product.stock} disponibles)
                </span>
              ) : (
                <span className="out-of-stock">✗ Indisponible</span>
              )}
            </span>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>
              {product.description ||
                "Aucune description disponible pour ce produit."}
            </p>
          </div>

          <div className="product-features">
            <h3>Caractéristiques</h3>
            <ul>
              {product.features && product.features.length > 0 ? (
                product.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))
              ) : (
                <>
                  <li>✓ Qualité premium</li>
                  <li>✓ Garantie constructeur</li>
                  <li>✓ Livraison rapide</li>
                  <li>✓ Service client disponible</li>
                </>
              )}
            </ul>
          </div>

          <div className="product-actions">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="add-to-cart-btn-large"
            >
              {product.stock === 0 ? "Indisponible" : "Ajouter au panier 🛒"}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h2 className="related-title">Produits similaires</h2>
          <div className="related-products-grid">
            {product.relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="related-product-card"
                onClick={() => handleRelatedProductClick(relatedProduct.id)}
              >
                <div className="related-product-image">
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                  {relatedProduct.stock === 0 && (
                    <span className="related-out-of-stock">Rupture</span>
                  )}
                </div>
                <div className="related-product-info">
                  <h4>{relatedProduct.name}</h4>
                  <p className="related-product-price">
                    {relatedProduct.price} €
                  </p>
                  <span className="related-product-stock">
                    {relatedProduct.stock > 0 ? (
                      <span className="in-stock-small">✓ En stock</span>
                    ) : (
                      <span className="out-of-stock-small">✗ Indisponible</span>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
