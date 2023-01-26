const Admin= require('../models/admin');
const flash= require('connect-flash');
// const bcrypt= require('bcrypt');
const Book = require('../models/book');

var currentAdmin;

require('dotenv').config();

module.exports.renderAdminLogin=(req, res) => {
    res.render('admin/adminLogin');
}

module.exports.renderAdminRegister=(req, res) => {
  res.render('admin/adminRegister');
}

module.exports.AdminRegister= async (req, res, next) => {
  try {
    if (req.body.adminCode === process.env.ADMIN_SECRET) {
      var username = ""
      var email = ""
      var password = ""
      
      username = req.body.username
      email = req.body.email,
      password = req.body.password;
      const user = new Admin({username, email});

      const admin = await Admin.register(user, password);
      currentAdmin = req.user
      req.login(admin, err => {
        if (err) return next(err);
        req.flash('success', 'Welcome to Admin Dashboard!');
        res.redirect('/');
    });
    } else {
      req.flash('error', "Secret code does not matching!");
      console.log("sakshi");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash(
      'error',
      err.message
    );
    res.redirect("/admin/register");
  }
};



module.exports.AdminLogin=async (req, res) => {
    req.flash('success', 'welcome!');
    currentAdmin = req.user
    const redirectUrl = req.session.returnTo || '/admin';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}


module.exports.AdminLogout=function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success', "Goodbye!");
      currentAdmin = undefined
      res.redirect('/admin/login');
    });
}


module.exports.AdminDashBoard= (req,res)=> {
    res.render('admin/DashBoard');
}

module.exports.index= async(req, res) => {
  const books = await Book.find({});
  res.render('admin/AllBooks', { books })
}

module.exports.showBook = async(req, res,) => {
  const book = await Book.findById(req.params.id)
  if (!book) {
      req.flash('error', 'Cannot find that book!');
      return res.redirect('/admin/books');
  }
  res.render('admin/showBook', { book });
}

module.exports.deleteBook = async(req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted campground')
  res.redirect('/admin/books');
}

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id)
  if (!book) {
      req.flash('error', 'Cannot find that book!');
      return res.redirect('/admin/books');
  }
  res.render('admin/editBook', { book });
}

module.exports.updateBook = async (req, res) => {
  const { id } = req.params;
  //console.log(req.body);
  const book = await Book.findByIdAndUpdate(id, { ...req.body.book});
  await book.save();
  
  req.flash('success', 'Successfully updated book!');
  res.redirect(`/admin/books/${id}`)
    
}

module.exports.renderNewForm = (req, res) => {
  res.render('admin/newBook');
}


module.exports.createBook = async (req, res, next) => {
  const book = new Book(req.body.book);
  //book.images= req.files.map(f => ({ url: f.path, filename: f.filename}));
  
  await book.save();
  //console.log(book);
  req.flash('success', 'Successfully made a new book!');
  res.redirect(`/admin/books/${book._id}`);
}





