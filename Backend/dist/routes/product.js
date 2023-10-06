"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controller/product");
const router = (0, express_1.Router)();
// checkDuplicateEmail
router.post("/", product_1.addProduct);
router.get("/", product_1.getAllProduct);
router.get("/:id", product_1.getProductById);
router.put("/:id", product_1.updateProduct);
router.delete("/:id", product_1.deleteProduct);
exports.default = router;
