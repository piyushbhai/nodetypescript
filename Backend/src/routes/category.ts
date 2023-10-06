import { Router } from "express";

import {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controller/category";

import {
  checkDuplicateEmail
} from "../middleware/user";

const router = Router();
// checkDuplicateEmail
router.post("/", addCategory);

router.get("/", getAllCategory);

router.get("/:id", getCategoryById);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

export default router;
