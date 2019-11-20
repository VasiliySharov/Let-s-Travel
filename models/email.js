let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let emailSchema = new Schema({
    id: String,
    email: String,
    name: String,
    text: String,
    data: Date
});

let Email = mongoose.model('Email', emailSchema, 'emails'); // 3th arg. in which collection to save the documents.

module.exports = { Email };