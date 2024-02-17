const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A collection must have a name"],
    unique: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
