const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const categoryRouter = require("./routes/categoryRoute");
const itemRouter = require("./routes/itemsRoute");

dotenv.config({ path: "./config.env" });

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/items", itemRouter);

module.exports = app;
