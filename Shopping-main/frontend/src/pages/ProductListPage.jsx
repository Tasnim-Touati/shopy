// src/pages/ProductListPage.jsx
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./ProductListPage.css"; // We'll create this

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des produits");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Impossible de charger les produits");
        setLoading(false);
      });
  }, []);

  const onStockUpdate = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:3001/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des produits");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Impossible de charger les produits");
        setLoading(false);
      });
  };

  // Loading state with spinner
  if (loading) {
    return (
      <div className="page-state-container">
        <div className="spinner"></div>
        <p className="state-message">Chargement des produits...</p>
      </div>
    );
  }

  // Error state with retry button
  if (error) {
    return (
      <div className="page-state-container">
        <div className="error-icon">⚠️</div>
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={handleRetry}>
          🔄 Réessayer
        </button>
      </div>
    );
  }

  // Empty state (if no products)
  if (products.length === 0) {
    return (
      <div className="page-state-container">
        <div className="empty-icon">📦</div>
        <p className="state-message">Aucun produit disponible</p>
      </div>
    );
  }

  // Success state - render products
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onStockUpdate={onStockUpdate}
        />
      ))}
    </div>
  );
};

export default ProductListPage;
