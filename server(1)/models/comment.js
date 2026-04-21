const mongoose = require("mongoose");

const Comment = mongoose.Schema(
  {
    text: String,
    createAt: {
      type: Date,
      default: new Date()
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    questionnaire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Questionnaire',
    }
  },
  { collection: "Comment" }
);

module.exports = mongoose.model("Comment", Comment);
