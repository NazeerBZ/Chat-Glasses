const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendListSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    }
});

const ChatRoomSchema = new Schema({
    chatId: String,
    userOne: String,
    userTwo: String
})

const UserSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    friendList: [FriendListSchema],
    chatRooms: [ChatRoomSchema]
});

const Users = mongoose.model('users', UserSchema);
module.exports = Users;