const Creature = require("../models/Creature.js");
const mongoose = require("mongoose");

exports.create = (creatureData) => {
  return Creature.create(creatureData);
};

exports.getAllPosts = () => Creature.find();

exports.getOnePost = (postId) => {
  
  const isValidObjectId = mongoose.isValidObjectId(postId);
  if (!isValidObjectId) {
    throw new Error()
  }
  
  const post = Creature.findOne({ _id: postId }).populate("owner");
  return post;
};

exports.updateOnePost = (postId, postData) => {
  const post = Creature.findByIdAndUpdate(postId, postData, { new: true });
  return post;
};

exports.deletePost = (postId) => Creature.findByIdAndDelete(postId);

exports.addVote = async (postId, user) => {
  const post = await Creature.findById(postId);
  post.votes.push(user);
  return post.save();
};

exports.getByOwner = (userId) => {
  return Creature.find({owner: userId})
}
