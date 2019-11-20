let User = require('../models/users').User;
let express = require('express');
let router = express.Router(); // with the help of this object. We can redirect requests from one file to another.
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');

router.post('/login', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email: email}); // checking database
    // console.log(user);
    // console.log(email);
    if (user.length > 0) {
        let comparisonResult = await bcrypt.compare(password, user[0].password);
        if (comparisonResult) {
            let token = auth.generateToken(user[0]);
            resp.cookie('auth_token', token); // 1th name of key, 2 - value.
            resp.send({
                redirectURL: '/admin'
            });
        } else {
            resp.status(400);
            resp.send('Rejected')
        }
    }  else {
        resp.send('Rejected')
    }
});
router.post('/register', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email: email}).where({password: password});
    if (user.length === 0) {
        let encrypterPass = await bcrypt.hash(password, 12);
        let newUser = new User({
            email: email,
            password: encrypterPass
        });
        await newUser.save();
        resp.send('Done')
    }  else {
        resp.send('Rejected')
    }
});

module.exports = router;