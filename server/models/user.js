let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name: {type: String},
    topScore: {type: Number}
})

module.exports = mongoose.model("User", userSchema);