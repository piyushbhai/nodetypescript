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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const nodemailer = require('nodemailer');
const user_1 = require("../models/user");
const { MAIL_SETTINGS } = require('../constants/constant');
const user_2 = require("../controller/user");
const user_3 = require("../middleware/user");
const router = (0, express_1.Router)();
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bhavik.patel@rayvat.com',
        pass: '*LKJ4%tmR}'
    }
});
// Configure Multer storage for file uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store uploaded files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        // console.log(file.fieldname + '-' + Date.now() + '-' + file.originalname);    
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
router.post('/', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // console.log(req.body); return
        let checkdup = yield (0, user_3.checkDuplicateEmail)(req, res);
        if (!checkdup) {
            return res.status(400).send({
                message: "Failed! Email is already in use!"
            });
        }
        let ss = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.originalname;
        var userdata = yield user_1.Users.create(Object.assign(Object.assign({}, req.body), { profileImage: ss }));
        transporter.sendMail({
            from: MAIL_SETTINGS.auth.user,
            to: req.body.email,
            subject: 'Product APP Registration Successful',
            html: `
        <div class="container">
          <h4>Thank you</h4>          
        </div>
      `,
        });
        return res
            .status(200)
            .json({ message: "User created successfully", data: userdata });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}));
// router.post("/", checkDuplicateEmail,registeruser);
// ,  passport.authenticate('local', {
//   successRedirect: '/dashboard',
//   failureRedirect: '/login',
// })
router.post("/login", user_2.loginuser);
// router.get("/", getAllToDo);
router.get("/:id", user_3.is_authenticate, user_2.getUserById);
// router.put("/:id", updateProfile);
router.put('/:id', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    try {
        let ss = (_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.originalname;
        yield user_1.Users.update(Object.assign({}, req.body), { where: { id }, individualHooks: true });
        const updateProfile = yield user_1.Users.findByPk(id);
        return res
            .status(200)
            .json({ message: "Profile updated successfully", data: updateProfile });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}));
// router.delete("/:id", deleteToDo);
exports.default = router;
