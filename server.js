const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

const app = express();

app.use(cookieSession({
  maxAge: 14 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

// Resolve CORS Issue
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Import route files
const auth = require('./routes/auth');

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));


// Use route files
app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send('Homepage new');
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
