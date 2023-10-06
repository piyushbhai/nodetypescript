import { RequestHandler } from "express";
const bcrypt = require("bcrypt")
var multer = require('multer');
require('dotenv').config();
// const nodemailer = require('nodemailer');
import { Users } from "../models/user";
// const { MAIL_SETTINGS } = require('../constants/constant');
import { Request, Response,NextFunction } from 'express';
const jwt = require("jsonwebtoken");

// const Strategy = require('passport-local');
// const passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'bhavik.patel@rayvat.com',
//     pass: '*LKJ4%tmR}'
//   }
// });


// export const registeruser = async (req:Request, res:Response, next:NextFunction) => {
 
//   try {
//     console.log(req.file);
//     console.log(req.body);
//     return
//       var userdata = await Users.create({ ...req.body });

//       await upload(req,res,async function(err:any){
//         if (err)
//             return res.end("error uploading file");
//       });
    
     
//       // await transporter.sendMail({
//       //   from: MAIL_SETTINGS.auth.user,
//       //   to: req.body.email, // list of receivers
//       //   subject: 'Product APP Registration Successful', // Subject line
//       //   html: `
//       //   <div class="container">
//       //     <h4>Thank you</h4>          
//       //   </div>
//       // `,
//       // });
//       return res
//         .status(200)
//         .json({ message: "User created successfully", data: userdata });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Server error' });
//   }
// };

export const getUserById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const userdata: Users | null = await Users.findByPk(id);

  return res
    .status(200)
    .json({ message: "User fetched successfully", data: userdata });
};



let saltRounds = 10;
export const loginuser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
// return
  const users: Users | null = await Users.findOne({
    where: {
      email: email,
      // password: hashpassword
    }
  });
  if(users==null){
    return res
    .status(401)
    .json({ message: "Login Failed! Please enter correct username and password"});  
  }else{
    const result = await bcrypt.compare(password, users.password);
    if(result){

      const theToken = jwt.sign(
        {
          email,
        },
        "the-super-strong-secrect",
        {}
      );

      return res
      .status(200)
      .json({ message: "Login successfully", data: users,token:theToken });
    }else{
      return res
     .status(401)
      .json({ message: "Login Failed! Please enter correct username and password"}); 
    }
  }
};

let filename:any ="";
const storage = multer.diskStorage({
  destination: (req:any, file:any, callback:any) => {
      // console.log(req);
      callback(null, './uploads');
  },
  filename: (req:any, file:any, callback:any) => {
      let name = file.originalname
      // console.log(name);
      
      filename =name ;
      // console.log(2);
      callback(null, name);
  }
});

var upload = multer({storage:storage}).single('Image');

// export const addimage: RequestHandler = async (req:any) => {
//   const { id } = req.params
//   await Users.update({ profileImage:filename }, { where: { id },individualHooks: true });
// }

interface MulterRequest extends Request {
  file: any;
}

// export const updateProfile: RequestHandler = async (req, res, next) => {
//   // console.log(req.body); return
//   const { id } = req.params;
//   // const { first_name, last_name, email, password, mobile } = req.body;
 
  
//   await upload(req,res,async function(err:any){
//     // if(req.body.Image)
//     //  await Users.update({ profileImage:req.body.Image }, { where: { id },individualHooks: true });
//      if (err)
//         return res.end("error uploading file");
//   });
 
//   await Users.update({ ...req.body }, { where: { id },individualHooks: true });
//   const updateProfile: Users | null = await Users.findByPk(id);

//   return res
//     .status(200)
//     .json({ message: "Profile updated successfully", data: updateProfile });
// };
