const Admin= require('../models/admin');
const flash= require('connect-flash');

const Book = require('../models/book');
const BookBank = require('../models/bookBank');
const Student = require('../models/student');
const ReqBook = require('../models/requestBook');
const { getLibraryBooks, getBookBank } = require('../utilities/getBooks');
const waitingMail = require('../mails/waitingMail');

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
        res.redirect('/admin');
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
    req.flash('success', 'welcome to admin dashboard!');
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

module.exports.Notification= (req,res)=> {
  res.render('admin/notification');
}

module.exports.index= async(req, res) => {
  const books = await Book.find({});
  res.render('admin/AllBooks', { books })
}

module.exports.BookbankIndex= async(req, res) => {
  const books = await BookBank.find({});
  res.render('admin/AllBookbank', { books })
}

module.exports.showBook = async(req, res,) => {
  const book = await Book.findById(req.params.id)
  if (!book) {
      req.flash('error', 'Cannot find that book!');
      return res.redirect('/admin/books');
  }
  res.render('admin/showBook', { book });
}

module.exports.showBookbank = async(req, res,) => {
  const book = await BookBank.findById(req.params.id);
  if (!book) {
      req.flash('error', 'Cannot find that book!');
      return res.redirect('/admin/books');
  }
  res.render('admin/showBookbank', { book });
}

module.exports.deleteBook = async(req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted book')
  res.redirect('/admin/books');
}

module.exports.deleteBookbank = async(req, res) => {
  const { id } = req.params;
  await BookBank.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted book')
  res.redirect('/admin/bookbank');
}

module.exports.deleteReqBook = async(req, res) => {
  const { id } = req.params;
  await ReqBook.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted Requested book')
  res.redirect('/admin/reqbook');
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

module.exports.renderEditFormBookbank = async (req, res) => {
  const { id } = req.params;
  const book = await BookBank.findById(id)
  if (!book) {
      req.flash('error', 'Cannot find that book!');
      return res.redirect('/admin/books');
  }
  res.render('admin/editBookbank', { book });
}

module.exports.updateBook = async (req, res) => {
  const { id } = req.params;
  //console.log(req.body);
  const book = await Book.findByIdAndUpdate(id, { ...req.body.book});
  await book.save();
  
  req.flash('success', 'Successfully updated book!');
  res.redirect(`/admin/books/${id}`)
    
}

module.exports.updateBookbank = async (req, res) => {
  const { id } = req.params;
  //console.log(req.body);
  const book = await BookBank.findByIdAndUpdate(id, { ...req.body.book});
  await book.save();
  req.flash('success', 'Successfully updated book!');
  res.redirect(`/admin/bookbank/${book._id}`);    
}

module.exports.renderNewForm = (req, res) => {
  res.render('admin/newBook');
}

module.exports.renderNewFormBookbank = (req, res) => {
  res.render('admin/newBookbank');
}

module.exports.createBook = async (req, res, next) => {
  const book = new Book(req.body.book);
  //book.images= req.files.map(f => ({ url: f.path, filename: f.filename}));
  
  await book.save();
  //console.log(book);
  req.flash('success', 'Successfully made a new book!');
  res.redirect(`/admin/books/${book._id}`);
}

module.exports.createBookbank = async (req, res, next) => {
  const book = new BookBank(req.body.book);  
  await book.save();
  req.flash('success', 'Successfully made a new book!');
  res.redirect(`/admin/bookbank/${book._id}`);
}

module.exports.renderWaitlist = async(req, res) => {
  const bookId = req.params.id;
  const book = await Book.findById(bookId).populate('waitlist');
  res.render('admin/waitlist', { book });
}

module.exports.renderSearchStudent = async(req, res) => {
  res.render('admin/searchStudent');
}

module.exports.searchStudent = async(req, res) => {
  const regId = req.body.regId;
  const user = await Student.findOne({ regId }).populate('wishlist').populate('waitlist');
  if(!user){
    
    req.flash('error', 'Cannot find that user!');
    return res.redirect('/admin/searchStudent');
  };
  let books = await getLibraryBooks(user._id);
  let bbooks = await getBookBank(user._id);
  let status = "admin";
  res.render('users/profile', { user, books, bbooks, status });
}

module.exports.renderEditStudentProfile = async(req, res) => {
  const { id } = req.params;
  const user = await Student.findById( id );
  if (!user) {
    req.flash('error', 'Cannot find that user!');
    return res.redirect('/admin/searchStudent');
}
  res.render('admin/editProfile' , {user});
}

module.exports.editProfile = async(req, res) => {
  const { id } = req.params;
  //console.log(req.body);
  const stu = await Student.findByIdAndUpdate(id, { ...req.body.student});
  await stu.save();
  req.flash('success', 'Successfully updated User Profile!');
  res.redirect(`/admin/searchStudent`);
}

module.exports.renderUnblock = async(req, res) => {
   const studentId = req.params.id;
   const student = await Student.findById(studentId).populate('issuedBooks');
   const books = await getLibraryBooks(studentId);
   res.render('admin/unblockStudent', { student, books });
};

module.exports.Unblock = async(req, res) => {
  const studentId = req.params.id;
  await Student.findByIdAndUpdate(studentId, { $set: { blacklisted: false }});
  req.flash('success', "Student unblocked!");
  res.redirect('/admin/showIssuedBooks');
}

module.exports.showIssuedBook = async(req, res) => {
  const books = await Book.find().populate({path: 'issuedBy', populate: { path: 'issuedBooks'}});
  res.render('admin/librarian', { books });
}

module.exports.showReqBook = async(req, res) => {
  const books = await ReqBook.find();
  res.render('admin/showReqBook', { books });
}

module.exports.showIssuedBookbank = async(req, res) => {
  const books = await BookBank.find().populate({path: 'issuedBy', populate: { path: 'bookBank'}});
  res.render('admin/librarian_bookbank', { books });
}

module.exports.returnBook = async(req, res) => {
  const { bookId, studentId } = req.params;
  const student = await Student.findByIdAndUpdate(studentId, { $pull: {issuedBooks : { bookId: bookId}}});
  const book = await Book.findByIdAndUpdate(bookId, { $pull: { issuedBy : studentId}, $inc: {availableCopies : 1}});
  req.flash('success', "Book returned!");
  if (book.waitlist.length !== 0 ){
    const recipient = await Student.findById(book.waitlist[0]);
    waitingMail(recipient.email, book.title);
  }
  if (student.blacklisted === true){
    res.redirect(`/admin/${student._id}/unblock`);
  }
  else{
    res.redirect('/admin/showIssuedBooks');
  }
}

module.exports.returnBookbank = async(req, res) => {
  const { bookId, studentId } = req.params;
  await Student.findByIdAndUpdate(studentId, { $pull: {bookBank : { bookId: bookId}}});
  await BookBank.findByIdAndUpdate(bookId, { $pull: { issuedBy : studentId}, $inc: {availableCopies : 1}});
  req.flash('success', "Book returned!")
  res.redirect('/admin/showIssuedBookBank');
}

module.exports.removeFromWaitlist = async(req, res) => {
  const { bookId, studentId } = req.params;
  await Student.findByIdAndUpdate(studentId, { $pull: { waitlist: bookId }});
  await Book.findByIdAndUpdate(bookId, { $pull: { waitlist: studentId }});
  req.flash('success', "Student removed from waiting list!");
  res.redirect(`/admin/${bookId}/waitlist`);
}