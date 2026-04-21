const express = require("express");
const User = require("../models/user")
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

const router = express.Router();

router.post("/sign-up", async (req, res) => {
  const { email, password, username, familyBindPregnant } = req.body

  if (!email || !password || !username) {
    res.status(400).send({
      error: "Missing fields"
    })
    return
  }

  if (familyBindPregnant) {
    const matchUser = await User.findOne({ username: familyBindPregnant })
    if (!matchUser) {
      res.status(400).send({
        error: "Pregnant username does not exist"
      })
      return
    }
  }

  const matchUser = await User.findOne({ email })
  if (matchUser) {
    res.status(400).send({
      error: "Duplicate email"
    })
    return
  }

  const user = new User(req.body)

  try {
    await user.save()
    res.status(200).json({ message: "Successful" })
  } catch (e) {
    res.status(500).send()
  }
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (user) {
    user.comparePassword(password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        let token = jwt.sign(
          {
            username: user.username,
            userId: user._id
          },
          JWT_SECRET,
          {
            expiresIn: "1h"
          }
        )
        res.json({...user.toJSON(), token});
      } else {
        res.json({ error: 'Invalid email or password.' })
      }
    });
  } else {
    res.json({ error: 'Invalid email or password.' })
  }
})


router.post("/", async (req, res) => {
  const { email, password, username, familyBindPregnant } = req.body

  if (!email || !password || !username) {
    res.status(400).send({
      error: "Missing fields"
    })
    return
  }

  if (familyBindPregnant) {
    const matchUser = await User.findOne({ username: familyBindPregnant })
    if (!matchUser) {
      res.status(400).send({
        error: "Pregnant username does not exist"
      })
      return
    }
  }

  const matchUser = await User.findOne({ email })
  if (matchUser) {
    res.status(400).send({
      error: "Duplicate email"
    })
    return
  }

  const user = new User(req.body)

  try {
    await user.save()
    res.status(200).json({ message: "Successful" })
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

router.get('/admin', async (req, res) => {
  const admins = await User.find({ role: 0 })
  res.json(admins)
})

router.get('/pregnant', async (req, res) => {
  const pregnants = await User.find({ role: 1 })
  res.json(pregnants)
})

router.get('/doctor', async (req, res) => {
  const doctors = await User.find({ role: 2 })
  res.json(doctors)
})

router.get('/family', async (req, res) => {
  const families = await User.find({ role: 3 })
  res.json(families)
})

router.get('/getByRole/:roles', async (req, res) => {
  const roles = req.params.roles.split(",")
  const users = await User.find({ role: { "$in" : roles} })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const pregnant = await User.findById(req.params.id)
  res.json(pregnant)
})

router.put('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)

  if (req.body.age) {
    user.age = req.body.age
  }
  if (req.body.education) {
    user.education = req.body.education
  }
  if (req.body.pregnantStatus) {
    user.pregnantStatus = req.body.pregnantStatus
  }
  if (req.body.education) {
    user.education = req.body.education
  }
  if (req.body.sex) {
    user.sex = req.body.sex
  }
  if (req.body.pregnantFamily) {
    user.pregnantFamily = req.body.pregnantFamily
  }
  if (req.body.familyBindPregnant) {
    user.familyBindPregnant = req.body.familyBindPregnant
  }
  if (req.body.job) {
    user.job = req.body.job
  }
  if (req.body.locationType) {
    user.locationType = req.body.locationType
  }
  if (req.body.symptomType) {
    user.symptomType = req.body.symptomType
  }

  try {
    await user.save()
    res.status(200).json({ message: "Successful" })
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/updatePassword', async (req, res) => {
  const { username, oldPassword, password } = req.body
  const user = await User.findOne({ username })

  if (user) {
    user.comparePassword(oldPassword, async (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        user.password = password
        try {
          await user.save()
          res.status(200).json({ message: "Successful" })
        } catch (e) {
          res.status(500).send()
        }
      } else {
        res.status(400).json({ error: "原密码不正确" })
      }
    });
  } else {
    res.status(400).json({ error: "用户名不存在" })
  }
})

module.exports = router;
