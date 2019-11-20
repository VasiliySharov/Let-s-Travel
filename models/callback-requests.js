let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let callbackRequestSchema = new Schema({
    id: String,
    phoneNumber: String,
    data: Date
});

let CallbackRequest = mongoose.model('CallbackRequest', callbackRequestSchema, 'callback-requests'); // 3th arg. in which collection to save the documents.

module.exports = {CallbackRequest};