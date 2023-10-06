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
exports.loginuser = exports.getUserById = void 0;
const bcrypt = require("bcrypt");
var multer = require('multer');
require('dotenv').config();
// const nodemailer = require('nodemailer');
const user_1 = require("../models/user");
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
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userdata = yield user_1.Users.findByPk(id);
    return res
        .status(200)
        .json({ message: "User fetched successfully", data: userdata });
});
exports.getUserById = getUserById;
let saltRounds = 10;
const loginuser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // console.log("LocalStrategy called");
    // passport.use(new LocalStrategy({
    //     usernameField : email,
    //     passwordField : password
    // },
    // function(email:any, password:any, done:any) {
    //   //  console.log(username); return
    //    const users: any | null = Users.findOne({
    //       where: {
    //         email: email,
    //         // password: hashpassword
    //       }
    //     });
    //     if(users==null){
    //   return res
    //   .status(401)
    //   .json({ message: "Login Failed! Please enter correct username and password"});  
    // }else{
    //   const result =  bcrypt.compare(password, users.password);
    //   if(result){
    //     return res
    //     .status(200)
    //     .json({ message: "Login successfully", data: users });
    //   }else{
    //     return res
    //    .status(401)
    //     .json({ message: "Login Failed! Please enter correct username and password"}); 
    //   }
    // }
    //     console.log(users); return
    // }))
    // console.log(email); return
    // console.log(email); return
    // var salt = bcrypt.genSaltSync(saltRounds);
    // let hashpassword = bcrypt.hashSync(password, salt);
    // const result = await bcrypt.compare(password, hashpassword);
    // console.log(result);
    // return
    const users = yield user_1.Users.findOne({
        where: {
            email: email,
            // password: hashpassword
        }
    });
    if (users == null) {
        return res
            .status(401)
            .json({ message: "Login Failed! Please enter correct username and password" });
    }
    else {
        const result = yield bcrypt.compare(password, users.password);
        if (result) {
            return res
                .status(200)
                .json({ message: "Login successfully", data: users });
        }
        else {
            return res
                .status(401)
                .json({ message: "Login Failed! Please enter correct username and password" });
        }
    }
});
exports.loginuser = loginuser;
let filename = "";
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // console.log(req);
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        let name = file.originalname;
        // console.log(name);
        filename = name;
        // console.log(2);
        callback(null, name);
    }
});
var upload = multer({ storage: storage }).single('Image');
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
