const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A card must have a title"],
  },
  description: {
    type: String,
    default: "Link Description",
  },
  imageUrl: {
    type: String,
  },
  linkUrl: {
    type: String,
    //   required: [true, "A card must have an url"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
