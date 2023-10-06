import { RequestHandler } from "express";
var multer = require('multer');

import { Products } from "../models/product";

export const addProduct: RequestHandler = async (req, res, next) => {
  
  await upload(req,res,async function(err:any){
      if (err)
        return res.end("error uploading file");
  });
  // console.log(req.body); return
  
  var todos = await Products.create({ ...req.body });
  return res
    .status(200)
    .json({ message: "Product created successfully", data: todos });
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const deletedTodo: Products | null = await Products.findByPk(id);

  await Products.destroy({ where: { id } });

  return res
    .status(200)
    .json({ message: "Product deleted successfully", data: deletedTodo });
};

export const getAllProduct: RequestHandler = async (req, res, next) => {
  const allTodos: Products[] = await Products.findAll();

  return res
    .status(200)
    .json({ message: "Product fetched successfully", data: allTodos });
};

export const getProductById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const todos: Products | null = await Products.findByPk(id);
  return res
    .status(200)
    .json({ message: "Product fetched successfully", data: todos });
};

export const updateProduct: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  await upload(req,res,async function(err:any){
      if (err)
        return res.end("error uploading file");
  });
  await Products.update({ ...req.body }, { where: { id } });
  const updatedTodos: Products | null = await Products.findByPk(id);
  return res
    .status(200)
    .json({ message: "Product updated successfully", data: updatedTodos });
};


let filename:any ="";
const storage = multer.diskStorage({
  destination: (req:any, file:any, callback:any) => {
      // console.log(req);
      callback(null, './uploads/products');
  },
  filename: (req:any, file:any, callback:any) => {
      let name = file.originalname
      // console.log(name);
      
      filename =name ;
      // console.log(2);
      callback(null, name);
  }
});

var upload = multer({storage:storage}).single('productImage');

interface MulterRequest extends Request {
  file: any;
}