"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// var passport = require('passport')
// import multer from 'multer';
const user_1 = require("../controller/user");
const user_2 = require("../middleware/user");
const router = (0, express_1.Router)();
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
router.post("/", user_2.checkDuplicateEmail, user_1.registeruser);
router.post("/login", user_1.loginuser);
// router.get("/", getAllToDo);
router.get("/:id", user_1.getUserById);
router.put("/:id", user_1.updateProfile);
// router.delete("/:id", deleteToDo);
exports.default = router;
