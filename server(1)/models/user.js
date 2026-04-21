const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = mongoose.Schema(
  {
    email: String,
    password: String,
    username: String,
    age: String,
    education: { type: String, required: false },
    pregnantStatus: { type: String, required: false },
    sex: { type: String, required: false },
    job: { type: String, required: false },
    locationType: { type: String, required: false },
    symptomType: { type: String, required: false },
    pregnantFamily: { type: String, required: false },
    familyBindPregnant: { type: String, required: false },
    qualification: { type: String, required: false },
    avatar: String,
    role: Number
  },
  { collection: "User" }
);

User.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

User.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

User.options.toJSON = {
  transform: function(doc, ret, options) {
    delete ret.__v;
    delete ret.password;
    return ret;
  }
};

module.exports = mongoose.model("User", User);
