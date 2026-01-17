import express from "express";
import {
  previewOrderController,
  createOrderController,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/preview", previewOrderController);
router.post("/create", createOrderController); // NEW endpoint

export default router;
