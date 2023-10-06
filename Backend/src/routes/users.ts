import { Router } from "express";
import multer from 'multer';
import { Request, Response } from 'express';
const nodemailer = require('nodemailer');
import { Users } from "../models/user";
const { MAIL_SETTINGS } = require('../constants/constant');
import passport from 'passport';


import {
  getUserById,
  loginuser  
} from "../controller/user";

import {
  checkDuplicateEmail
} from "../middleware/user";

const router = Router();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bhavik.patel@rayvat.com',
    pass: '*LKJ4%tmR}'
  }
});

// Configure Multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store uploaded files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    // console.log(file.fieldname + '-' + Date.now() + '-' + file.originalname);    
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post('/',upload.single('file'), async(req: Request, res: Response) => {
  try {
    // console.log(req.body); return
    
    let checkdup =await checkDuplicateEmail(req, res)
    if(!checkdup){
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }
    let ss= req?.file?.originalname
    var userdata = await Users.create({ ...req.body,profileImage:ss });

    transporter.sendMail({
        from: MAIL_SETTINGS.auth.user,
        to: req.body.email, // list of receivers
        subject: 'Product APP Registration Successful', // Subject line
        html: `
        <div class="container">
          <h4>Thank you</h4>          
        </div>
      `,
      });
      return res
        .status(200)
        .json({ message: "User created successfully", data: userdata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// router.post("/", checkDuplicateEmail,registeruser);
router.post("/login", passport.authenticate('local'), loginuser);
// router.get("/", getAllToDo);

router.get("/:id", getUserById);

// router.put("/:id", updateProfile);
router.put('/:id',upload.single('file'), async(req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let ss= req?.file?.originalname
    await Users.update({ ...req.body }, { where: { id },individualHooks: true });
    const updateProfile: Users | null = await Users.findByPk(id);
    return res
    .status(200)
    .json({ message: "Profile updated successfully", data: updateProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// router.delete("/:id", deleteToDo);

export default router;
