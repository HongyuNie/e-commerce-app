const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');

const app = express();

//pass a middleware function, let all the route handlders have it applied
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['lsfjddldfjs324gfdrytgr']
}));

app.use(authRouter);


app.listen(3000, () => {
    console.log('Listening')
})