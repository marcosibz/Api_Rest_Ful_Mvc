import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/products.controller.js";

const router = Router();

router.get("/productos", getAllProducts);

router.get("/productos/:id", getProductById);

router.post("/productos", createProduct);

router.put("/productos/:id", updateProduct);

router.delete("/productos/:id", deleteProduct);

export default router;
