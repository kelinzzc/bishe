const express = require("express");
const Answer = require("../models/answer")
const router = express.Router();

router.get('/', async (req, res) => {
  const userId = req.query.userId;
  const answers = await Answer.find({ creator: userId })
  res.json(answers)
})

router.get('/:id', async (req, res) => {
  const answer = await Answer.findById(req.params.id)
  res.json(answer)
})

router.post('/', async (req, res) => {
  const answer = new Answer(req.body)
  try {
    await answer.save()
    res.status(200).json({ message: "Successful" })
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router;
