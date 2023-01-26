const express = require('express');
const app= express();
const path= require('path');
const ejsMate= require('ejs-mate');
const joi= require('joi');
const catchAsync= require('./utilities/catchAsync');


const userRoutes= require('./routes/users');
const bookRoutes=require('./routes/books')
const reviewRoutes= require('./routes/reviews');
const adminRoutes= require('./routes/admin');
const bookBankRoutes = require('./routes/bookBank');

const ExpressError= require('./utilities/ExpressError');
const methodOverride= require('method-override');
const mongoose= require('mongoose');
const flash= require('connect-flash');

const session= require('express-session');
const { date } = require('joi');
const passport= require('passport');
const localStrategy= require('passport-local');

const Student= require('./models/student');
const Book = require('./models/book');
const Admin = require('./models/admin');
const BookBank = require('./models/bookBank');


mongoose.connect('mongodb://127.0.0.1:27017/vjti-library', 
{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.set('strictQuery', false);

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


const sessionConfig = {
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
passport.use(new localStrategy(Student.authenticate()));

passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser()); //this 2 statements are for adding and removing user from session.

// passport.use(new localStrategy(Admin.authenticate()));

// passport.serializeUser(Admin.serializeUser());
// passport.deserializeUser(Admin.deserializeUser());


app.use((req,res,next) => {
   console.log(req.session);
   res.locals.currentUser = req.user;
   res.locals.success=req.flash('success');
   res.locals.error= req.flash('error');
   next();
})

app.use('/admin', adminRoutes);
app.use('/', userRoutes);
app.use('/books', bookRoutes);
            //prefix
app.use('/books/:id/reviews', reviewRoutes);
app.use('/bookbank', bookBankRoutes);


app.get('/', (req,res) => {
   res.render('books/home.ejs');
 })

 app.get('/info', (req,res) => {
   res.render('books/aboutUs.ejs');
 })

 app.get('/rules', (req,res) => {
   res.render('books/rules.ejs');
 })

 app.get('/eresources', (req,res) => {
   res.render('books/eResources.ejs');
 })

 app.get('/Aboutus', (req,res) => {
   res.render('books/aboutUs.ejs');
 })
 app.get('/profile', (req, res) => {
   res.render('books/profile.ejs');
 })

 app.get("/requestbook", (req,res)=> {
   res.render('books/requestbook.ejs');
 })

app.all('*', (req, res, next) => {
     next(new ExpressError('Page not found', 404));
})

app.use((err, req, res, next) => {
   const { statusCode = 500} = err;
   if (!err.message) err.message = "Something went wrong!";  
   res.status(statusCode).render('error', {err});
})

app.listen(3000, () => {
   console.log('App is listening on port 3000')
   })