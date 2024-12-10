const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    country: {
        type: String,
    },
    refreshToken: {
        type: String
    }
});

userSchema.plugin(timestamps);

const UserSchema = mongoose.model("Users", userSchema, "Users");
module.exports = { UserSchema };
