const mongoose = require("mongoose");
const PointSchema = require("./utils/PointSchema")

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: "2dsphere"
    }

})
//primeiro paramentro é o nome de como ele será salvo
//o segundo é o Schema
module.exports = mongoose.model("Dev", DevSchema);