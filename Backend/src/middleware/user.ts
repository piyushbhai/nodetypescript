import { Users } from "../models/user";
import { RequestHandler } from "express";

export const checkDuplicateEmail: RequestHandler = async (req, res, next) => {
  Users.findOne({
          where: {
            email: req.body.email
          }
        }).then(user => {
          if (user) {
            res.status(400).send({
              message: "Failed! Email is already in use!"
            });
            return;
          }
    
          next();
        }); 
};


// checkDuplicateUsernameOrEmail = (req, res, next) => {
//     // Email
//     Users.findOne({
//       where: {
//         email: req.body.email
//       }
//     }).then(user => {
//       if (user) {
//         res.status(400).send({
//           message: "Failed! Email is already in use!"
//         });
//         return;
//       }

//       next();
//     }); 
// };

// const verifySignUp = {
//     checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
//     // checkRolesExisted: checkRolesExisted
//   };
  
//   module.exports = verifySignUp;