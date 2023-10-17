const mongoose = require("mongoose");

const creatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required !"],
    minLength: [2, "Name must be at least 2 characters"],
  },
  species: {
    type: String,
    required: [true, "Species is required !"],
    minLength: [3, "Species must be at least 3 characters"],
  },
  skinColor: {
    type: String,
    required: [true, "Skin color is required !"],
    minLength: [3, "Skin color must be at least 3 characters"],
  },
  eyeColor: {
    type: String,
    required: [true, "Eye color is required !"],
    minLength: [3, "Eye color must be at least 3 characters"],
  },
  image: {
    type: String,
    required: [true, "Image is required !"],
    match: [/^(http|https):\/\//, "Invalid url"],
  },
  description: {
    type: String,
    required: [true, "Description is required !"],
    minLength:[5,"Description must be at least 5 characters"],
    maxLength:[500,"Description must be less than 500 characters"],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  votes: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
      },
    },
  ],
});

const Creature = mongoose.model("Creature", creatureSchema);

module.exports = Creature;
