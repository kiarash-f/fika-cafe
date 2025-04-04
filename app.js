const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const categoryRouter = require("./routes/categoryRoute");
const itemRouter = require("./routes/itemsRoute");
const userRouter = require("./routes/userRoute");

dotenv.config({ path: "./config.env" });

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/items", itemRouter);
app.use("/api/v1/user", userRouter);

module.exports = app;

//Error controller cors 