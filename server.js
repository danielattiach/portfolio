const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const path = require('path');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const GraphQLSchema = require('./GraphQLSchema');
const https = require("https");
setInterval(() => {
    https.get("https://daniel-port.herokuapp.com");
}, 1.8e+6); // every 5 minutes (300000)

require('./models/User');
require('./services/passport');

const app = express();

app.use(cors());

app.use(cookieSession({
  maxAge: 14 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));

app.use(passport.initialize({}));
app.use(passport.session({}));

// Resolve CORS Issue
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Import route files
const auth = require('./routes/auth');
const messages = require('./routes/messages');
const music = require('./routes/music');

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));


// Use route files
app.use('/auth', auth);
app.use('/messages', messages);
app.use('/music', music);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use('/graphql', graphqlHTTP({
  schema: GraphQLSchema,
  graphiql: true
}));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
