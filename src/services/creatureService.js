const Creature = require("../models/Creature.js");

exports.create = (creatureData) => {
  return Creature.create(creatureData);
};
