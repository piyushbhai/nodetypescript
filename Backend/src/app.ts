import express from "express";
var cors = require('cors')
import connection from "./db/config";
import { json, urlencoded } from "body-parser";
import userRoutes from "./routes/users";
import productRoutes from "./routes/product";
import categoryRoutes from "./routes/category";

const app = express();
app.use(cors())
app.use(express.json());

app.use("/uploads", express.static("uploads/"));
// app.use(urlencoded({ extended: true }));
app.use(express.urlencoded({extended: true}))



app.use("/users", userRoutes);
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

connection
  .sync()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((err) => {
    console.log("Err", err);
  });

app.listen(5000);
