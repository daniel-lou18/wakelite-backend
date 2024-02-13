const express = require("express");
const cors = require("cors");

const cardRouter = require("./routes/cardRoutes");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/link", cardRouter);

module.exports = app;
