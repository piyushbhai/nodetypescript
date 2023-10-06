import { RequestHandler } from "express";

import { Category } from "../models/category";

export const addCategory: RequestHandler = async (req, res, next) => {
  var todos = await Category.create({ ...req.body });
  return res
    .status(200)
    .json({ message: "Category created successfully", data: todos });
};

export const deleteCategory: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const deletedTodo: Category | null = await Category.findByPk(id);

  await Category.destroy({ where: { id } });

  return res
    .status(200)
    .json({ message: "Category deleted successfully", data: deletedTodo });
};

export const getAllCategory: RequestHandler = async (req, res, next) => {
  const allTodos: Category[] = await Category.findAll();

  return res
    .status(200)
    .json({ message: "Category fetched successfully", data: allTodos });
};

export const getCategoryById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const todos: Category | null = await Category.findByPk(id);
  return res
    .status(200)
    .json({ message: "Category fetched successfully", data: todos });
};

export const updateCategory: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  await Category.update({ ...req.body }, { where: { id } });
  const updatedTodos: Category | null = await Category.findByPk(id);
  return res
    .status(200)
    .json({ message: "Category updated successfully", data: updatedTodos });
};
