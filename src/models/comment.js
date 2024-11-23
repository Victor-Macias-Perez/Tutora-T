const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  id_Post: {
    type: String,
    required: true
  },
  uid_user: {
    type: String,
    required: true
  },
  id_Course: {
    type: String
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
}
});

module.exports =
mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
