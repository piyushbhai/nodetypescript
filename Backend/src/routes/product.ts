import { Router } from "express";
import { Request, Response } from 'express';
import multer from 'multer';
import { Products } from "../models/product";


import {
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controller/product";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post('/',upload.single('productImage'), async(req: Request, res: Response) => {
  try {
    let ss= req?.file?.originalname
    var userdata = await Products.create({ ...req.body,image:ss });

      return res
        .status(200)
        .json({ message: "Product  created successfully", data: userdata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/", getAllProduct);

router.get("/:id", getProductById);

// router.put("/:id", updateProduct);

router.put('/:id',upload.single('productImage'), async(req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let ss= req?.file?.originalname
    await Products.update({ ...req.body }, { where: { id } });
    const data: Products | null = await Products.findByPk(id);
      return res
        .status(200)
        .json({ message: "Product updated successfully", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete("/:id", deleteProduct);

export default router;
