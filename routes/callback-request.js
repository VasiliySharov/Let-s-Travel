let CallbackRequest = require('../models/callback-requests').CallbackRequest; // . because the module is an object.
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router(); // with the help of this object. We can redirect requests from one file to another.
let authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, resp) => {
    resp.send(await CallbackRequest.find()); // search for all callback-requests from the database
});
router.post('/', async (req, resp) => {
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
        id: uniqid(),
        phoneNumber: reqBody.phoneNumber,
        date: new Date()
    });
    await newRequest.save();
    resp.send('Accepted');

});
router.delete('/:id', authMiddleware, async (req, resp) => {
    await CallbackRequest.deleteOne({id: req.params.id});
    resp.send('Deleted');
});

module.exports = router;