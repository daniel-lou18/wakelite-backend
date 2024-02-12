const express = require("express");
const cors = require("cors");
const { getMetatags } = require("./utils/metatags");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) =>
  res.json({ status: "success", message: "coooooooooooool" })
);

app.post("/api/link", async (req, res) => {
  const { url } = req.body;
  try {
    const payload = await getMetatags(url);
    res.status(201).json({
      status: "success",
      message: "Succesfully retrieved website data",
      payload,
    });
  } catch (err) {
    if (err.message.includes("ERR_NAME_NOT_RESOLVED")) {
      res.status(404).json({
        status: "error",
        message: "Could not find the website",
      });
    } else {
      res
        .status(500)
        .json({ status: "error", message: "Could not retrieve website data" });
    }
  }
});

module.exports = app;
