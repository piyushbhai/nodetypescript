"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const product_1 = require("../models/product");
const product_2 = require("../controller/product");
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
router.post('/', upload.single('productImage'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let ss = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.originalname;
        var userdata = yield product_1.Products.create(Object.assign(Object.assign({}, req.body), { image: ss }));
        return res
            .status(200)
            .json({ message: "Product  created successfully", data: userdata });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}));
router.get("/", product_2.getAllProduct);
router.get("/:id", product_2.getProductById);
// router.put("/:id", updateProduct);
router.put('/:id', upload.single('productImage'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    try {
        let ss = (_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.originalname;
        yield product_1.Products.update(Object.assign({}, req.body), { where: { id } });
        const data = yield product_1.Products.findByPk(id);
        return res
            .status(200)
            .json({ message: "Product updated successfully", data: data });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}));
router.delete("/:id", product_2.deleteProduct);
exports.default = router;
