const express = require("express");
const Question = require("../models/question")
const router = express.Router();

router.get('/', async (req, res) => {
  const questions = await Question.find({})
  res.json(questions)
})

router.get('/:id', async (req, res) => {
  const question = await Question.findById(req.params.id)
  res.json(question)
})

router.post('/', async (req, res) => {
  const question = new Question(req.body)
  try {
    await question.save()
    res.status(200).json({ message: "Successful" })
  } catch (e) {
    res.status(500).send()
  }
})

router.put('/:id', async (req, res) => {
  const question = await Question.findById(req.params.id)
  question.title = req.body.title;
  question.content = req.body.content;
  question.options = req.body.options;
  question.creator = req.body.creator;
  try {
    await question.save()
    res.status(200).json({ message: "Successful" })
  } catch (e) {
    res.status(500).send()
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Successful" })
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router;
