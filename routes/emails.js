let Email = require('../models/email').Email; // . because the module is an object.
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router(); // with the help of this object. We can redirect requests from one file to another.
let authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, resp) => {
    resp.send(await Email.find()); // search for all callback-requests from the database
});
router.post('/', async (req, resp) => {
    let reqBody = req.body;
    let newEmail = new Email({
        id: uniqid(),
        name: reqBody.name,
        text: reqBody.text,
        email: reqBody.email,
        date: new Date()
    });
    await newEmail.save();
    resp.send('Accepted');

});
router.delete('/:id', authMiddleware, async (req, resp) => {
    await Email.deleteOne({id: req.params.id});
    resp.send('Deleted');
});

module.exports = router;