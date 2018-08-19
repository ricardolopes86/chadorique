const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/users');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/main')(app);
require('./routes/auth')(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})