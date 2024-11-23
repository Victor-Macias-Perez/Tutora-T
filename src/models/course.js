const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
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
  career: {
    type: String,
    required: true,
  },
  dates: {
    type: String,
    required: true,
  },
  hours: {
    type: String,
    required: true,
  },
  site: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  id_Course: {
    type: Number,
    required: true,
  },
  participants: {
    type: Array,    
  },
  division: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
}
});

module.exports =
mongoose.models.Course || mongoose.model('Course', CourseSchema);
