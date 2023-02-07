const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "Please provide username"],
        unique: [true, "Username already exists"],
    },
    firstname: {
        type: String,
        trim: true,
        required: [true, "Please provide first name"]
    },
    lastname: {
        type: String,
        trim: true,
        required: [true, "Please provide last name"]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Please provide password"]
    },
    created: {
        type: Date,
        default: Date.now
    },
    updatedat: {
        type: Date,
        default: Date.now
    },
})

UserSchema.pre('save', (next) => {
    console.log("Before Save")
    let now = Date.now()

    this.updatedat = now

    if (!this.created) {
        this.created = now
    }
    next()
});

const User = mongoose.model("User", UserSchema);
module.exports = User;