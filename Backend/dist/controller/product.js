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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.getProductById = exports.getAllProduct = exports.deleteProduct = exports.addProduct = void 0;
var multer = require('multer');
const product_1 = require("../models/product");
const addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield upload(req, res, function (err) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err)
                return res.end("error uploading file");
        });
    });
    // console.log(req.body); return
    var todos = yield product_1.Products.create(Object.assign({}, req.body));
    return res
        .status(200)
        .json({ message: "Product created successfully", data: todos });
});
exports.addProduct = addProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedTodo = yield product_1.Products.findByPk(id);
    yield product_1.Products.destroy({ where: { id } });
    return res
        .status(200)
        .json({ message: "Product deleted successfully", data: deletedTodo });
});
exports.deleteProduct = deleteProduct;
const getAllProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allTodos = yield product_1.Products.findAll();
    return res
        .status(200)
        .json({ message: "Product fetched successfully", data: allTodos });
});
exports.getAllProduct = getAllProduct;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const todos = yield product_1.Products.findByPk(id);
    return res
        .status(200)
        .json({ message: "Product fetched successfully", data: todos });
});
exports.getProductById = getProductById;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield upload(req, res, function (err) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err)
                return res.end("error uploading file");
        });
    });
    yield product_1.Products.update(Object.assign({}, req.body), { where: { id } });
    const updatedTodos = yield product_1.Products.findByPk(id);
    return res
        .status(200)
        .json({ message: "Product updated successfully", data: updatedTodos });
});
exports.updateProduct = updateProduct;
let filename = "";
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // console.log(req);
        callback(null, './uploads/products');
    },
    filename: (req, file, callback) => {
        let name = file.originalname;
        // console.log(name);
        filename = name;
        // console.log(2);
        callback(null, name);
    }
});
var upload = multer({ storage: storage }).single('productImage');
