"use strict";
// import express from "express";
// var cors = require('cors')
// import connection from "./db/config";
// import { json, urlencoded } from "body-parser";
// import userRoutes from "./routes/users";
// import productRoutes from "./routes/product";
// import categoryRoutes from "./routes/category";
// const app = express();
// app.use("/uploads", express.static("uploads"));
// app.use('/uploads',express.static(__dirname + '/uploads'));
// app.use(cors())
// app.use(json());
// app.use(urlencoded({ extended: true }));
// app.use(express.urlencoded({extended: true}))
// app.use("/users", userRoutes);
// app.use("/product", productRoutes);
// app.use("/category", categoryRoutes);
// app.use(
//   (
//     err: Error,
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     res.status(500).json({ message: err.message });
//   }
// );
// connection
//   .sync()
//   .then(() => {
//     console.log("Database synced successfully");
//   })
//   .catch((err) => {
//     console.log("Err", err);
//   });
// app.listen(5000);
// import userRoutes from "./routes/users";
// import express from 'express';
// import bodyParser from 'body-parser';
// var cors = require('cors')
// const app = express();
// const port = 5000;
// app.use(express.json());
// app.use(cors())
// // app.use(urlencoded({ extended: true }));
// // app.use(bodyParser.json())
// // Configure body-parser middleware
// app.use(express.urlencoded({ extended: false }));
// // app.use(bodyParser.json());
// app.use(express.static('uploads'));
// app.use("/users", userRoutes);
// // Your other routes and middleware go here
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
