const express = require('express');
const app= express();
const path= require('path');
const ejsMate= require('ejs-mate');
const joi= require('joi');
const catchAsync= require('./utilities/catchAsync');

//const userRoutes= require('./routes/users');
//const campgroundRoutes=require('./routes/campgrounds')
//const reviewRoutes= require('./routes/reviews');

const ExpressError= require('./utilities/ExpressError');
const methodOverride= require('method-override');
const mongoose= require('mongoose');
const flash= require('connect-flash');

const session= require('express-session');
const { date } = require('joi');
const passport= require('passport');
const localStrategy= require('passport-local');
//const User= require('./models/user');


mongoose.connect('mongodb://127.0.0.1:27017/vjti-library', 
{useNewUrlParser: true, useUnifiedTopology: true});

const db= mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});
   
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


/*const sessionConfig = {
   secret: 'thisshouldbeabettersecret',
   resave: false,
   saveUninitialized: true,
   cookie: {
      httpOnly: true,  //for more security
      expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
   }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session()); //always remember passport.session in written after app.use(session()).
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); //this 2 statements are for adding and removing user from session.


app.use((req,res,next) => {
   console.log(req.session);
   res.locals.currentUser = req.user;
   res.locals.success=req.flash('success');
   res.locals.error= req.flash('error');
   next();
})*/

app.listen(3000, () => {
   console.log('App is listening on port 3000')
   })