const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  selectedDate: {
    type: Date,
  },
  tags: [
    {
      type: String,
    },
  ],
});
module.exports = mongoose.model("Blog", BlogSchema);
