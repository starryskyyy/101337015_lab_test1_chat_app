const mongoose = require('mongoose')

const PrivateMessagesSchema = new mongoose.Schema({
    from_user: {
        type: String,
        trim: true,
    },
    to_user: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
        trim: true,
    },
    date_sent: {
        type: Date,
        default: Date.now
    },
})


const PrivateMessages = mongoose.model("User", PrivateMessagesSchema);
module.exports = PrivateMessages;