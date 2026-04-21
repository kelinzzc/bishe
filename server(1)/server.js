const express = require('express')
const cors = require("cors");
const mongoose = require('mongoose');
const userRouter = require("./controller/user")
const questionRouter = require("./controller/question")
const questionnaireRouter = require("./controller/questionnaire")
const answerRouter = require("./controller/answer")
const uploadRouter = require("./controller/upload")
const articleRouter = require("./controller/article")

const port = 3000

const MONGO_URL = "mongodb://localhost:27017/ymklyz";
mongoose.connect(MONGO_URL).then(() => {
  console.log("Connect to mongodb successful!")
});

const app = express()

app.use(cors());

app.use(express.json({limit: '50mb'}));

app.use(express.static('uploads'))
app.use(uploadRouter);
app.use("/user", userRouter);
app.use("/question", questionRouter);
app.use("/questionnaire", questionnaireRouter);
app.use("/answer", answerRouter);
app.use("/article", articleRouter);

let server = app.listen(port, () => {
  console.log(`Service listening on port ${port}`)
})

module.exports = server
