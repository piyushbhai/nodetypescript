import { Users } from "../models/user";
import { RequestHandler } from "express";
import { Request, Response,NextFunction } from 'express';
const jwt = require('jsonwebtoken');


export const checkDuplicateEmail = async (req:Request, res:Response) => {
  Users.findOne({
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
        return true
};


export const is_authenticate = async (req:Request, res:Response,next: NextFunction) => {
  
  if(!req.headers.authorization ){
      return res.status(422).json({
          error: "Please provide token",
      });
  }

  let theToken1 =  req.headers.authorization.toString();
  let theToken =  theToken1.split(" ")[1]
  // let theToken = theToken1.split(",")
  // console.log(theToken.split(" ")[1]);

  if(theToken!='' || theToken!=null || theToken!= undefined){
      try {
          const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
          let email = decoded.email
          // console.log(decoded.email); return          
          Users.findOne({
            where: {
              email: email
            }
          }).then(user => {
            if (user) {
              next()
             return true              
            }else{
              res.status(400).send({
                message: "No user found!"
              });
              return false;
            } 
          }); 

       } catch(err) {
          return res.status(422).json({
              error: "Invalid token",
          });
       }
  }else{
      
      return res.status(422).json({
          error: "Invalid token",
      });
  }
 
        return true
};
