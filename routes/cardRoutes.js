const express = require("express");
const cardController = require("../controllers/cardController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(cardController.getAllCards)
  .post(cardController.createCard);

module.exports = router;
