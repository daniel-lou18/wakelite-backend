const { getMetatags } = require("../utils/metatags");
const Card = require("../models/CardModel");
const Collection = require("../models/CollectionModel");

exports.getAllCards = async (req, res) => {
  try {
    let filter = {};
    if (req.params.collectionId)
      filter = { cardCollection: req.params.collectionId };
    const cards = await Card.find(filter);
    res.status(200).json({ status: "success", payload: cards });
  } catch (err) {
    console.error(err);
    res.status(404).json({ status: "fail", message: "Could not get cards" });
  }
};

exports.createCard = async (req, res) => {
  try {
    const { linkUrl } = req.body;
    const data = await getMetatags(linkUrl);
    console.log(req.params);
    const collection = await Collection.findById(req.params.collectionId);
    console.log(collection);
    const newCard = await Card.create({
      ...data,
      linkUrl,
      cardCollection: collection.id,
    });

    res.status(201).json({
      status: "success",
      payload: newCard,
    });
  } catch (err) {
    console.error(err);
    if (err.message.includes("ERR_NAME_NOT_RESOLVED")) {
      res.status(400).json({
        status: "fail",
        message: "Invalid url",
      });
    } else {
      res
        .status(500)
        .json({ status: "fail", message: "Could not retrieve website data" });
    }
  }
};
