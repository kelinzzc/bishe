const express = require("express");
const Questionnaire = require("../models/questionnaire")
const router = express.Router();

router.get('/', async (req, res) => {
  const { type } = req.query;
  const questionnaires = await Questionnaire.find({ type }).populate('questions')
  res.json(questionnaires)
})

router.get('/:id', async (req, res) => {
  const questionnaire = await Questionnaire.findById(req.params.id).populate('questions')
  res.json(questionnaire)
})

router.post('/', async (req, res) => {
  const questionnaire = new Questionnaire(req.body)
  try {
    await questionnaire.save()
    res.status(200).json({ message: "Successful" })
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router;
