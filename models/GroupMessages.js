const mongoose = require('mongoose')

const GroupMessagesSchema = new mongoose.Schema({
    from_user: {
        type: String,
        trim: true,
    },
    room: {
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


const GroupMessages = mongoose.model("User", GroupMessagesSchema);
module.exports = GroupMessages;