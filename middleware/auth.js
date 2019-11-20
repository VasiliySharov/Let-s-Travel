let auth = require('../controllers/auth');

function checkAuth(req, resp, next) {
    let token = req.cookies['auth_token']; // ['the name of the cookie']to read the cookie for auth.
    if (token && auth.checkToken(token)) {
        next();
    } else {
        resp.status(400);
        resp.send('Not authorized.');
    }
}

module.exports = checkAuth;