import { Router } from "express";

import {
  addProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controller/product";

import {
  checkDuplicateEmail
} from "../middleware/user";

const router = Router();
// checkDuplicateEmail
router.post("/", addProduct);

router.get("/", getAllProduct);

router.get("/:id", getProductById);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
