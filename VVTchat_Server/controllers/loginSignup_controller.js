//Models
const Users = require('../models/user_model');

module.exports = {

    login(req, res, next) {

        Users.find({ username: req.body.username, password: req.body.password })
            .then((result) => {
                if (result.length === 0) {
                    return next(new Error('Incorrect Username & Password'))
                }
                else {
                    var data = {
                        id: result[0]._id,
                        username: result[0].username,
                        fullname: result[0].fullname,
                        email: result[0].email,
                        friendList: result[0].friendList,
                        chatRooms: result[0].chatRooms
                    }
                    res.send(data);
                }
            })
            .catch(next)
    },

    signup(req, res, next) {

        Users.find({ username: req.body.username })
            .then((result) => {
                if (result.length === 0) {
                    Users.create(req.body)
                        .then((newUser) => {
                            var data = {
                                id: newUser._id,
                                username: newUser.username,
                                fullname: newUser.fullname,
                                email: newUser.email,
                                friendList: newUser.friendList,
                                chatRooms: newUser.chatRooms,
                            }
                            res.send(data);
                        });
                }
                else {
                    return next(new Error('username already exist'));
                }
            })
            .catch(next)
    }
}