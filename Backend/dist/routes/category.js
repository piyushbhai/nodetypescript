"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = require("../controller/category");
const user_1 = require("../middleware/user");
const router = (0, express_1.Router)();
// checkDuplicateEmail
router.post("/", category_1.addCategory);
router.get("/", user_1.is_authenticate, category_1.getAllCategory);
router.get("/:id", category_1.getCategoryById);
router.put("/:id", category_1.updateCategory);
router.delete("/:id", category_1.deleteCategory);
exports.default = router;
