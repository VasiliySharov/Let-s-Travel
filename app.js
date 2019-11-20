let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let cookieParser = require('cookie-parser');
let postsRouter = require('./routes/posts');
let callbackRequestsRouter = require('./routes/callback-request');
let emailsRouter = require('./routes/emails');
let usersRouter = require('./routes/users');
let auth = require('./controllers/auth');

// let CallbackRequest = require('./models/callback-requests').CallbackRequest; // and not to connect the whole object but only the class we add dot callback request.

app.set('view engine', 'ejs'); // the tool template engine, what we have installed

// console.log(uniqid());

mongoose.connect('mongodb://localhost/travels', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.json());

// app.use(multer({dest: 'public/images'}).single('imageFile'));
// app.use(multer({dest: 'public/images'}).single('imageFile'));

let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
});

app.use(multer({storage: imageStorage}).single('imageFile'));
app.use(express.static('public'));
app.use(cookieParser()); // so that cookies are automatically generated for every request

app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);


let Post = require('./models/post').Post;
app.use('/sight', async (req, resp) => {
    let id = req.query.id; // href="/sight?id=${post.id}" in main.js file
    let post = await Post.findOne({id: id}); // to get info. then the data has to be inserted here
    resp.render('sight', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    }) // we don't need to specify format because we did it above. no need to specify folder and default name of it is 'views'.
});


app.get('/admin', (req, resp) => {
    let token = req.cookies['auth_token']; // ['the name of the cookie']to read the cookie for auth.
    if (token && auth.checkToken(token)) {
        resp.render('admin');
    } else {
        resp.redirect('/login');
    }

});
app.get('/login', (req, resp) => {
    resp.render('login');
});
app.listen(3000, () => console.log('Listening...'));