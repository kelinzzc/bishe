const express = require("express");
const Article = require("../models/article")
const Comment = require('../models/comment');
const router = express.Router();

router.get('/', async (req, res) => {
  const articles = await Article.find({}).populate("creator")
  res.json(articles)
})

router.get('/:id', async (req, res) => {
  const article = await Article.findById(req.params.id).populate("creator").populate({
    path: 'comments',
    model: 'Comment',
    populate: {
      path: 'user',
      model: 'User'
    }
  })
  res.json(article)
})

router.post('/', async (req, res) => {
  const article = new Article(req.body)
  try {
    await article.save()
    res.status(200).json({ message: "Successful" })
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/addComment', async (req, res) => {
  const { aid, uid, text } = req.body

  try {
    const comment = await Comment.create({
      text,
      user: {
        _id: uid
      }
    })
    await Article.findOneAndUpdate(
      {
        _id: aid
      },
      {
        $push: {
          comments: {
            $each: [comment._id], $position: 0
          }
        }
      },
      {
        new: true
      }
    )
    res.status(200).json({ message: "Successful" })
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router;
