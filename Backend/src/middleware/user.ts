import { Users } from "../models/user";
import { RequestHandler } from "express";
import { Request, Response } from 'express';

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
