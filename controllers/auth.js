let jwt = require('jsonwebtoken');
let secret = 'asd234asd323d';

function generateToken(user) {
    let payload = {
        email: user.email,
        password: user.password
    };
    return  jwt.sign(payload, secret);
}

function checkToken(token) { // check a user's token
    return  jwt.verify(token, secret);
}

module.exports = { generateToken, checkToken};