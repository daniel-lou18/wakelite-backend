const { getMetatags } = require("../utils/metatags");
const Card = require("../models/CardModel");

exports.createCard = async (req, res) => {
  try {
    const { linkUrl } = req.body;
    const data = await getMetatags(linkUrl);
    const newCard = await Card.create({ ...data, linkUrl });

    res.status(201).json({
      status: "success",
      message: "Succesfully retrieved website data",
      payload: newCard,
    });
  } catch (err) {
    console.error(err);
    if (err.message.includes("ERR_NAME_NOT_RESOLVED")) {
      res.status(404).json({
        status: "fail",
        message: "Could not find the website",
      });
    } else {
      res
        .status(500)
        .json({ status: "fail", message: "Could not retrieve website data" });
    }
  }
};
