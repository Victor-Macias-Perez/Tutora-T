if( process.env.NODE_ENV !== 'production' ){
  require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const connectDB = require("./src/services/mongoDB");


const app = express();

//Load Config
// dotenv.config({ path: "./src/services/config.env" });

//Passport config
// require("./src/services/passport")(passport);

connectDB();

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}  

//Session
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
//   })
// );


app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH','OPTIONS']
}));

//settings
const PORT = process.env.PORT || 3000;
app.set('json spaces', 2);

// Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());
//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.get('/', (req, res) => {
  res.json({
      "message": ":O"
  });
});




app.use('/json', require('./src/routes/careers'));
app.use('/json', require('./src/routes/divisions'));

app.use("/auth", require("./src/routes/auth.js"));

app.use('/users', require('./src/routes/users'));
app.use('/users/interaction', require('./src/routes/interaction'));
app.use('/users/arbol', require('./src/routes/arbol'));
app.use('/users/notification', require('./src/routes/notification'));
app.use('/users/emails', require('./src/routes/smtp'));



app.use('/chats', require('./src/routes/chats'));
app.use('/chats/bot', require('./src/routes/chatBot'));

app.use('/courses', require('./src/routes/courses'));

app.use('/posts', require('./src/routes/posts'));
app.use('/comments', require('./src/routes/comments'));
app.use('/likes', require('./src/routes/likes'));

//starting the server
app.listen( PORT, () => {
  console.log(`Server on port ${PORT}`);
});