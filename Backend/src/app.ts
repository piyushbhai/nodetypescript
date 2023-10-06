import express from "express";
var cors = require('cors')
var session = require('express-session')
// import session from "'express-session'";
import connection from "./db/config";
import { json, urlencoded } from "body-parser";
import userRoutes from "./routes/users";
import productRoutes from "./routes/product";
import categoryRoutes from "./routes/category";
import passport from 'passport';
import './config/passport'; // Import the passport configuration

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


app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


connection
  .sync()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((err) => {
    console.log("Err", err);
  });

app.listen(5000);
