import Joi from "joi";

// Schéma de validation pour un article de commande
const cartItemSchema = Joi.object({
  productId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "L'ID du produit doit être un nombre",
      "number.integer": "L'ID du produit doit être un entier",
      "number.positive": "L'ID du produit doit être positif",
      "any.required": "L'ID du produit est requis",
    }),
  quantity: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .required()
    .messages({
      "number.base": "La quantité doit être un nombre",
      "number.integer": "La quantité doit être un entier",
      "number.min": "La quantité doit être au moins 1",
      "number.max": "La quantité ne peut pas dépasser 100",
      "any.required": "La quantité est requise",
    }),
});

// Schéma de validation pour le panier complet
const cartSchema = Joi.array()
  .items(cartItemSchema)
  .min(1)
  .max(50)
  .required()
  .messages({
    "array.base": "Le panier doit être un tableau",
    "array.min": "Le panier doit contenir au moins 1 article",
    "array.max": "Le panier ne peut pas contenir plus de 50 articles",
    "any.required": "Le panier est requis",
  });

/**
 * Middleware de validation pour les commandes
 */
export const validateOrderMiddleware = (req, res, next) => {
  const { cart } = req.body;

  const { error, value } = cartSchema.validate(cart, {
    abortEarly: false, // Retourne toutes les erreurs, pas seulement la première
    stripUnknown: true, // Supprime les propriétés non définies dans le schéma
  });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join("."),
      message: detail.message,
    }));

    return res.status(400).json({
      message: "Erreur de validation",
      errors,
    });
  }

  // Remplace le cart par la valeur validée et nettoyée
  req.body.cart = value;
  next();
};

/**
 * Valide les articles d'une commande (fonction utilitaire)
 */
export const validateOrder = (items) => {
  const { error } = cartSchema.validate(items);
  
  if (error) {
    throw new Error(error.details[0].message);
  }
  
  return true;
};