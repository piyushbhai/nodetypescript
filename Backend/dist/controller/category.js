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
exports.updateCategory = exports.getCategoryById = exports.getAllCategory = exports.deleteCategory = exports.addCategory = void 0;
const category_1 = require("../models/category");
const addCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var todos = yield category_1.Category.create(Object.assign({}, req.body));
    return res
        .status(200)
        .json({ message: "Category created successfully", data: todos });
});
exports.addCategory = addCategory;
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedTodo = yield category_1.Category.findByPk(id);
    yield category_1.Category.destroy({ where: { id } });
    return res
        .status(200)
        .json({ message: "Category deleted successfully", data: deletedTodo });
});
exports.deleteCategory = deleteCategory;
const getAllCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allTodos = yield category_1.Category.findAll();
    return res
        .status(200)
        .json({ message: "Category fetched successfully", data: allTodos });
});
exports.getAllCategory = getAllCategory;
const getCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const todos = yield category_1.Category.findByPk(id);
    return res
        .status(200)
        .json({ message: "Category fetched successfully", data: todos });
});
exports.getCategoryById = getCategoryById;
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield category_1.Category.update(Object.assign({}, req.body), { where: { id } });
    const updatedTodos = yield category_1.Category.findByPk(id);
    return res
        .status(200)
        .json({ message: "Category updated successfully", data: updatedTodos });
});
exports.updateCategory = updateCategory;
