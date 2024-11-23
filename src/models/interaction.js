const mongoose = require("mongoose");

const InteractionSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  uid_user: {
    type: String,
    required: true,
  },
  hide_posts: {
    type: Array
  },
  save_posts: {
    type: Array
  },
  followers: {
    type: Array
  },
  createdAt: {
    type: Date,
    default: Date.now
}
});

module.exports =
mongoose.models.Interaction || mongoose.model('Interaction', InteractionSchema);
