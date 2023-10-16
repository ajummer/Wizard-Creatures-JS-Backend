const Creature = require("../models/Creature.js");

exports.create = (creatureData) => {
  return Creature.create(creatureData);
};

exports.getAllPosts = () => Creature.find();

exports.getOnePost = (postId) => {
  const post = Creature.findById(postId).populate("owner");
  return post;
};

exports.updateOnePost = (postId, postData) => {
  const post = Creature.findByIdAndUpdate(postId, postData, { new: true });
  return post;
};

exports.deletePost = (postId) => Creature.findByIdAndDelete(postId)
