"use strict";

const mongoose = require("mongoose");

const clothesSchema = mongoose.Schema({
  name: { type: String, required: true },
  size: {
    type: String,
    enum: ["XXXS", "XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"],
  },
});

const clothesModel = mongoose.model("clothes", clothesSchema);

module.exports = clothesModel;