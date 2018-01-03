const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageUserSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    avatar:{
        type: String
    }
})

const MessageSchema = new Schema({

    text: String,
    user: MessageUserSchema,
    createdAt: String,
    chatId: String
});

const Messages = mongoose.model('messages', MessageSchema);
module.exports = Messages;