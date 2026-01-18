import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Monte les routes des produits sur /api/products
app.use("/api/products", productRoutes);

// Monte les routes des commandes sur /api/orders
app.use("/api/orders", orderRoutes);

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});