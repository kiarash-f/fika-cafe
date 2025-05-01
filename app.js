const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const categoryRouter = require("./routes/categoryRoute");
const itemRouter = require("./routes/itemsRoute");
const userRouter = require("./routes/userRoute");
const path = require("path");

dotenv.config({ path: "./config.env" });

const app = express();

//Middlewares
app.use(express.json());

const allowedOrigin = "https://fika.liara.run";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(morgan("dev"));

//Routes
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/items", itemRouter);
app.use("/api/v1/user", userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack); // log error to console
  res.status(500).json({ message: err.message, stack: err.stack });
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

module.exports = app;

//Error controller cors
