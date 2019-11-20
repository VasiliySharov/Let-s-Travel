let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
    id: String,
    title: String,
    date: Date,
    description: String,
    text: String,
    country: String,
    imageURL: String
});

let Post = mongoose.model('Post', postSchema);

module.exports = {Post}; // The first Post = mongoose.model('Post', postSchema);
// So in this case the modern JavaScript allows us to write it this way. Not {Post: Post}
// Javascript understands that the key name is post and the value name also has to be post next.