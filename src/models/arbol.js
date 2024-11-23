const mongoose = require("mongoose");

const ArbolSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  uid_user: {
    type: String,
  },

  likes: {
    type: Array,
    career:{
      type: String,
    },
    total:{
      type: Number,
    }
  },

  posts: {
    type: Array
  },

  followers: {
    type: Array
  },
  
  courses: {
    type: Array
  },

  inscriptos: {
    type: Array
  },

  save_posts: {
    type: Array
  },

  comments: {
    type: Array
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
}
});

module.exports =
mongoose.models.Arbol || mongoose.model('Arbol', ArbolSchema);