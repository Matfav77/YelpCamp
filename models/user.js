const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocaLMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

UserSchema.plugin(passportLocaLMongoose);

module.exports = mongoose.model("User", UserSchema);