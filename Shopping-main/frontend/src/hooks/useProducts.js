// src/hooks/useProducts.js
import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";

/* Custom hook to fetch products from the API*/
export const useProducts = () => {
  const [products, setProducts] = useState([]); // Store fetched products
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(""); // Store any fetch error message

  useEffect(() => {
    // Async function to fetch products
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(); // Fetch data from API
        setProducts(data); // Store in state
      } catch {
        setError("Impossible de charger les produits"); // Show error on failure
      } finally {
        setLoading(false); // Stop loading indicator in all cases
      }
    };

    loadProducts(); // Call the async fetch function once on mount
  }, []); // Empty dependency array → run once on component mount

  return { products, loading, error };
};
