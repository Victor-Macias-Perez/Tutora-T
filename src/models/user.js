const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  career: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  imgName: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  imgPortadaUrl: {
    type: String,
  },
  imgPortadaName: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
}
});

module.exports =
mongoose.models.User || mongoose.model('User', UserSchema);
