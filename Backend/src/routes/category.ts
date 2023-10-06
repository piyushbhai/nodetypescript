import { Router } from "express";

import {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controller/category";

import {
  is_authenticate
} from "../middleware/user";

const router = Router();
// checkDuplicateEmail
router.post("/",is_authenticate, addCategory);

router.get("/",is_authenticate, getAllCategory);

router.get("/:id",is_authenticate ,getCategoryById);

router.put("/:id", is_authenticate, updateCategory);

router.delete("/:id",is_authenticate, deleteCategory);

export default router;
