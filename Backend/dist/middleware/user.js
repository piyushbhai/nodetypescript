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
exports.is_authenticate = exports.checkDuplicateEmail = void 0;
const user_1 = require("../models/user");
const jwt = require('jsonwebtoken');
const checkDuplicateEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.Users.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            // res.status(400).send({
            //   message: "Failed! Email is already in use!"
            // });
            return false;
        }
    });
    return true;
});
exports.checkDuplicateEmail = checkDuplicateEmail;
const is_authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        return res.status(422).json({
            error: "Please provide token",
        });
    }
    let theToken1 = req.headers.authorization.toString();
    let theToken = theToken1.split(" ")[1];
    // let theToken = theToken1.split(",")
    // console.log(theToken.split(" ")[1]);
    if (theToken != '' || theToken != null || theToken != undefined) {
        try {
            const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
            let email = decoded.email;
            // console.log(decoded.email); return          
            user_1.Users.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                if (user) {
                    next();
                    return true;
                }
                else {
                    res.status(400).send({
                        message: "No user found!"
                    });
                    return false;
                }
            });
        }
        catch (err) {
            console.log('err', err);
            return res.status(422).json({
                error: "Invalid token",
            });
        }
    }
    else {
        return res.status(422).json({
            error: "Invalid token",
        });
    }
    return true;
});
exports.is_authenticate = is_authenticate;
