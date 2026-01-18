// src/pages/ProductListPage.jsx
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./ProductListPage.css";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:3001/api/products");
      
      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
      }

      const data = await res.json();
      console.log("Données reçues de l'API:", data); // DEBUG

      // Gère les différents formats de réponse possibles
      let productsArray = [];
      
      if (Array.isArray(data)) {
        // Format direct: [products]
        productsArray = data;
      } else if (data.data && Array.isArray(data.data)) {
        // Format: { data: [products] }
        productsArray = data.data;
      } else if (data.products && Array.isArray(data.products)) {
        // Format: { products: [products] }
        productsArray = data.products;
      } else {
        console.error("Format de réponse inattendu:", data);
        throw new Error("Format de données invalide reçu du serveur");
      }

      setProducts(productsArray);
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors du chargement:", err);
      setError(err.message || "Impossible de charger les produits");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onStockUpdate = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleRetry = () => {
    fetchProducts();
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
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="page-state-container">
        <div className="empty-icon">📦</div>
        <p className="state-message">Aucun produit disponible</p>
        <button className="retry-button" onClick={handleRetry}>
          🔄 Actualiser
        </button>
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