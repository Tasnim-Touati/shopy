import {
  calculateOrderPreview,
  createOrder,
} from "../services/order.service.js";

/**
 * Prévisualise une commande (calcule le total sans modifier le stock)
 */
export const previewOrderController = (req, res) => {
  try {
    const { cart } = req.body;

    // La validation est déjà faite par le middleware, mais double vérification
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ 
        message: "Le panier est vide ou invalide" 
      });
    }

    const orderPreview = calculateOrderPreview(cart);
    
    res.status(200).json({
      success: true,
      data: orderPreview,
    });
  } catch (err) {
    console.error("❌ Error in previewOrderController:", err);

    // Gestion spécifique pour les problèmes de stock
    if (err.stockIssues) {
      return res.status(409).json({
        success: false,
        message: err.message,
        stockIssues: err.stockIssues,
      });
    }

    // Erreur générique
    res.status(400).json({
      success: false,
      message: err.message || "Erreur lors de la prévisualisation de la commande",
    });
  }
};

/**
 * Crée une commande (valide et diminue le stock)
 */
export const createOrderController = (req, res) => {
  try {
    const { cart } = req.body;

    // La validation est déjà faite par le middleware
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Le panier est vide ou invalide" 
      });
    }

    const order = createOrder(cart);
    
    res.status(201).json({
      success: true,
      message: "Commande créée avec succès",
      data: order,
    });
  } catch (err) {
    console.error("❌ Error in createOrderController:", err);

    // Gestion spécifique pour les problèmes de stock
    if (err.stockIssues) {
      return res.status(409).json({
        success: false,
        message: err.message,
        stockIssues: err.stockIssues,
      });
    }

    // Produit non trouvé
    if (err.message.includes("introuvable")) {
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }

    // Erreur générique
    res.status(400).json({
      success: false,
      message: err.message || "Erreur lors de la création de la commande",
    });
  }
};