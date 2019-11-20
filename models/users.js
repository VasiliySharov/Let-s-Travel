let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: String,
    password: String
});

let User = mongoose.model('User', userSchema, 'users');

module.exports = {User}; // The first Post = mongoose.model('Post', postSchema);
// So in this case the modern JavaScript allows us to write it this way. Not {Post: Post}
// Javascript understands that the key name is post and the value name also has to be post next.