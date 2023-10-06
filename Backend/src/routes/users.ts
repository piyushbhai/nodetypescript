import { Router } from "express";
// var passport = require('passport')
// import multer from 'multer';

import {
  getUserById,
  loginuser,
  registeruser,
  updateProfile
} from "../controller/user";

import {
  checkDuplicateEmail
} from "../middleware/user";

const router = Router();


// Configure Multer storage for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Store uploaded files in the 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post('/submit', (req: Request, res: Response) => {
//   try {
    
    
//     // Access form data using req.body
//     const { name, description } = req.body;
//     // console.log( name, description);
    
//     // Access the uploaded file information (if any)
//     const file = req.file;
//     console.log(file);
//     console.log(req.body); return
//     // Handle the form data and uploaded file as needed
//     // Typically, you would store the file path in your database

//     res.status(200).json({ message: 'Form data received successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


router.post("/", checkDuplicateEmail ,registeruser);
router.post("/login", loginuser);
// router.get("/", getAllToDo);

router.get("/:id", getUserById);

router.put("/:id", updateProfile);

// router.delete("/:id", deleteToDo);

export default router;
