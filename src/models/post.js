const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  imgName: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  uid_user: {
    type: String,
    required: true,
  },
  id_Course: {
    type: String,    
  },
  id_Post: {
    type: Number,
    required: true,
  },
  career: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
mongoose.models.Post || mongoose.model('Post', PostSchema);
