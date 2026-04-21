const mongoose = require("mongoose");

const Questionnaire = mongoose.Schema(
  {
    title: String,
    description: String,
    questions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    }],
    createAt: {
      type: Date,
      default: new Date()
    },
    endDescription: String,
    type: String
  },
  { collection: "Questionnaire" }
);

module.exports = mongoose.model("Questionnaire", Questionnaire);
