const { getMetatags } = require("../utils/metatags");
const Card = require("../models/CardModel");

exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
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
    const newCard = await Card.create({ ...data, linkUrl });

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
