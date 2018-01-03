//Models
const Users = require('../models/user_model');

module.exports = {

    addUser(req, res, next) {

        //create a chatroom for both user
        var chatId = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 10; i++) {
            chatId += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        var chatRoom = {
            chatId: chatId,
            userOne: req.body.currentUser.username,
            userTwo: req.body.unknownUser.username,
        }

        //save Friend in my friendlist
        var friend = {
            _id: req.body.unknownUser.id,
            username: req.body.unknownUser.username,
            fullname: req.body.unknownUser.fullname
        }

        Users.update(
            { _id: req.body.currentUser.id },
            { $push: { friendList: friend, chatRooms: chatRoom } }
        )
            .then(() => {
                Users.findById({ _id: req.body.currentUser.id })
                    .then((myself) => {
                        // myself.friendList.push(friend);
                        // myself.chatRooms.push(chatRoom);
                        var data = {
                            id: myself._id,
                            username: myself.username,
                            fullname: myself.fullname,
                            email: myself.email,
                            friendList: myself.friendList,
                            chatRooms: myself.chatRooms
                        }
                        res.send(data);
                    })
                    .catch(next)
            })
            .catch(next);

        //save Me in my friend's friendList
        var me = {
            _id: req.body.currentUser.id,
            username: req.body.currentUser.username,
            fullname: req.body.currentUser.fullname
        }

        Users.update(
            { _id: req.body.unknownUser.id },
            { $push: { friendList: me, chatRooms: chatRoom } }
        )
            .catch(next);
    },

    unfriend(req, res, next) {

        // console.log(req.body.currentUser);
        // console.log(req.body.friend);
        Users.update(
            { _id: req.body.currentUser.id },
            { $pull: { friendList: { _id: req.body.friend._id } } }
        )
            .then(() => {
                Users.findById({ _id: req.body.currentUser.id })
                    .then((myself) => {
                        var data = {
                            id: myself._id,
                            username: myself.username,
                            fullname: myself.fullname,
                            email: myself.email,
                            friendList: myself.friendList,
                            chatRooms: myself.chatRooms
                        }
                        res.send(data);
                    })
                    .catch(next)
            })
            .catch(next);

        //remove me from my friend's friend list (friend)
        Users.update(
            { _id: req.body.friend._id },
            { $pull: { friendList: { _id: req.body.currentUser.id } } }
        )
            .catch(next);
    }
}