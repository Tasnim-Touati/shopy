import { 
  getAllProducts, 
  getProductById as getProductByIdService 
} from "../services/product.service.js";

/**
 * Récupère tous les produits
 */
export const getProducts = (req, res) => {
  try {
    const products = getAllProducts();
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("❌ Error in getProducts:", error);
    
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des produits",
    });
  }
};

/**
 * Récupère un produit par son ID
 */
export const getProductById = (req, res) => {
  try {
    const { id } = req.params;

    // Validation de l'ID
    const productId = parseInt(id, 10);
    
    if (isNaN(productId) || productId <= 0) {
      return res.status(400).json({
        success: false,
        message: "ID de produit invalide. L'ID doit être un nombre positif.",
      });
    }

    // Récupération du produit
    const product = getProductByIdService(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Produit avec l'ID ${productId} non trouvé`,
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("❌ Error in getProductById:", error);

    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du produit",
    });
  }
};