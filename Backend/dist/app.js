"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var cors = require('cors');
const config_1 = __importDefault(require("./db/config"));
const users_1 = __importDefault(require("./routes/users"));
const product_1 = __importDefault(require("./routes/product"));
const category_1 = __importDefault(require("./routes/category"));
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static("uploads/"));
// app.use(urlencoded({ extended: true }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/users", users_1.default);
app.use("/product", product_1.default);
app.use("/category", category_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
config_1.default
    .sync()
    .then(() => {
    console.log("Database synced successfully");
})
    .catch((err) => {
    console.log("Err", err);
});
app.listen(5000);
