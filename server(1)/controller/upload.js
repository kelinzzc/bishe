const express = require("express");
const router = express.Router();
const multer  = require('multer')
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/videos')
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}.${file.originalname.split(".")[1]}`)
  }
})
const upload = multer({storage})

router.post('/upload', upload.single('file'),  async (req, res) => {
  const filename = req.file.filename
  res.status(200).json({ message: "Successful", filename })
})

module.exports = router;
