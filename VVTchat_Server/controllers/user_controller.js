//Models
const Users = require('../models/user_model');

module.exports = {

    userCredentials(req, res, next) {
        Users.findOne({ username: req.headers.username })
            .then((result) => {
                if (result === null) {
                    return next(new Error('Something Wrong'));
                }
                else {
                    res.send(result);
                }
            })
            .catch(next)
    },

    updateUser(req, res, next) {

        Users.findByIdAndUpdate({ _id: req.body.id }, req.body)
            .then((result) => {
                var data = {
                    updatedUser: {
                        id: result._id,
                        username: result.username,
                        fullname: result.fullname,
                        email: result.email,
                        friendList: result.friendList,
                        chatRooms: result.chatRooms,
                    },
                    message: 'successfully updated'
                }
                res.send(data);
            })
            .catch(next);
    },

    searchUser(req, res, next) {
        Users.findOne({ username: req.headers.username })
            .then((result) => {
                if (result === null) {
                    return next(new Error('Not Found'))
                }
                else {
                    var data = {
                        id: result._id,
                        username: result.username,
                        fullname: result.fullname,
                    }
                    res.send(data);
                }
            })
            .catch(next)
    }

}