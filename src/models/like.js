const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  id_post: {
    type: String,
    required: true,
  },
  uid_users: {
    type: Array,
    
  },
  id_Course: {
    type: String    
  },
  createdAt: {
    type: Date,
    default: Date.now,
}
});

module.exports =
mongoose.models.Like || mongoose.model('Like', LikeSchema);