const Collection = require("../models/CollectionModel");

exports.getCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;
    console.log(collectionId);
    const collection = await Collection.findById(collectionId);
    res.status(200).json({ status: "success", payload: collection });
  } catch (err) {
    console.error(err);
    res
      .status(404)
      .json({ status: "fail", message: "Could not get collection" });
  }
};

exports.getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    res.status(200).json({ status: "success", payload: collections });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "fail", message: "Could not get collections" });
  }
};
