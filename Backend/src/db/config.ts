import { Sequelize } from "sequelize-typescript";
import { Users } from "../models/user";
import { Products } from "../models/product";
import { Category } from "../models/category";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "product_api",
  logging: false,
  models: [Users,Products,Category],
});

export default connection;
