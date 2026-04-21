const mongoose = require("mongoose");

const Question = mongoose.Schema(
  {
    title: String,
    content: String,
    options: [String],
    multiple: {
      type: Boolean,
      default: false
    },
    createAt: {
      type: Date,
      default: new Date()
    },
    creator:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  { collection: "Question" }
);

module.exports = mongoose.model("Question", Question);
