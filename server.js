const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.DB.replace("<password>", process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("Succesfully connected to database"))
  .catch((err) => console.error(`Error connecting to database: ${err}`));

const PORT = process.env.PORT;

app.listen(PORT || 4000, () =>
  console.log(`Server is listening on port ${PORT}`)
);
