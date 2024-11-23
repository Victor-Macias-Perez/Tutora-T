const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  id_notification: {
    type: Number,
    required: true,
  },
  uid_creator: {
    type: String,
    required: true,
  },
  id_action: {
    type: String,
  },
  uid_user: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    default: true,
  }, 
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
}
});

module.exports =
mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);