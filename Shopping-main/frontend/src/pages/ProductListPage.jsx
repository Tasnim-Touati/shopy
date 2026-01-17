import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const ProductListPage = () => {
  const [products, setProducts] = useState([]); // Store fetched products
  const [loading, setLoading] = useState(true); // Loading state while fetching
  const [error, setError] = useState(null); // Error message if fetch fails

  // Fetch products from backend API once on component mount
  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data); // Store fetched products in state
        setLoading(false); // Stop loading
      })
      .catch(() => {
        setError("Impossible de charger les produits"); // Show error message
        setLoading(false);
      });
  }, []);

  /**
   * Update a single product in state (used if stock changes, e.g., after adding to cart)
   * @param {Object} updatedProduct - The product object with updated data
   */
  const onStockUpdate = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
  };

  // Loading state
  if (loading) return <p>Chargement...</p>;

  // Error state
  if (error) return <p>{error}</p>;

  // Render products in a grid
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onStockUpdate={onStockUpdate} // Pass callback to update stock after cart actions
        />
      ))}
    </div>
  );
};

export default ProductListPage;
