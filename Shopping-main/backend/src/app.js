import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import dotenv from "dotenv";

import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();

const app = express();

// 1. Helmet - Sécurise les headers HTTP
app.use(helmet());

// 2. CORS - Configure les origines autorisées
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// 3. Body parser avec limite de taille
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// 4. Logging des requêtes
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// 5. Rate limiting global
const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: "Trop de requêtes depuis cette IP, veuillez réessayer plus tard.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

// 6. Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// 7. Routes de l'API
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// 8. Route 404 - Non trouvé
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});

// 9. Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  // Ne pas exposer les détails en production
  const message = process.env.NODE_ENV === "production" 
    ? "Une erreur interne est survenue" 
    : err.message;

  res.status(err.status || 500).json({
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;