const express = require("express");
const cardRouter = require("./cardRoutes");
const collectionController = require("../controllers/collectionController");

const router = express.Router();

router.use("/:collectionId/cards", cardRouter);

router.route("/").get(collectionController.getAllCollections);

router.route("/:collectionId").get(collectionController.getCollection);

module.exports = router;
