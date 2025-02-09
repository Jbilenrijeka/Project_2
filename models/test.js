const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true
  }
});

const Test = model("TestUser", userSchema);

module.exports = Test;
