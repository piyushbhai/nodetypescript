"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("../models/user");
const product_1 = require("../models/product");
const category_1 = require("../models/category");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "",
    database: "product_api",
    logging: false,
    models: [user_1.Users, product_1.Products, category_1.Category],
});
exports.default = connection;
