const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  id_message: {
    type: Number,
    required: true,
  },
  uid_userChat: {
    type: String,
    required: true,
  },
  uid_user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  seen: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
}
});

module.exports =
mongoose.models.Chat || mongoose.model('Chat', ChatSchema);
