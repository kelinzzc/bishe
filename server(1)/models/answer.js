const mongoose = require("mongoose");

// Schema for answer
const Answer = mongoose.Schema(
  {
    questionnaire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Questionnaire',
    },
    answerQuestions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    }],
    answerOption: [String],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createAt: {
      type: Date,
      default: new Date()
    },
  },
  { collection: "Answer" }
);

module.exports = mongoose.model("Answer", Answer);
