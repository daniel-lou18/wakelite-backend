const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const cardRouter = require("./routes/cardRoutes");
const collectionRouter = require("./routes/collectionRoutes");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/collections", collectionRouter);
app.use("/api/cards", cardRouter);

module.exports = app;
