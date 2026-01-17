import express from "express";
import cors from "cors";

import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";

// Crée l'application Express
const app = express();

// Active CORS pour permettre les requêtes depuis le frontend
app.use(cors());

// Active le parsing automatique du JSON dans les requêtes
app.use(express.json());

// Monte les routes des produits sur /api/products
app.use("/api/products", productRoutes);

// Monte les routes des commandes sur /api/orders
app.use("/api/orders", orderRoutes);

export default app;