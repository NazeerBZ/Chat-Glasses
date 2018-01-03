const loginSignup_controller = require('./controllers/loginSignup_controller');
const user_controller = require('./controllers/user_controller');
const friend_controller = require('./controllers/friend_controller');

module.exports = (app) => {

    app.post('/api/login', loginSignup_controller.login);
    app.post('/api/signup', loginSignup_controller.signup);
    app.get('/api/userCredentials', user_controller.userCredentials);
    app.post('/api/updateUser', user_controller.updateUser);
    app.get('/api/searchUser', user_controller.searchUser);
    app.post('/api/addUser', friend_controller.addUser);
    app.delete('/api/unfriend', friend_controller.unfriend);
}