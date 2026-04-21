const mongoose = require("mongoose");

const Article = mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
    type: String,
    subtype: String,
    createAt: { type: Date, default: new Date()},
    creator:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    authorName: String,
    authorImage: String,
    video: String,
  },
  { collection: "Article" }
);

module.exports = mongoose.model("Article", Article);
