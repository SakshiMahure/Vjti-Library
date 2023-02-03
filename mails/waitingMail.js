const nodemailer = require('nodemailer');
const Student = require('../models/student');

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: 'VJTIlibrary@outlook.com',
        pass: 'vjtiLib2023'
    }
});

module.exports = async(recipient, bookname) => {
        transporter.sendMail({
            from: 'VJTIlibrary@outlook.com',
            to: recipient,
            subject: "Attention! Your desired book is now available to issue!",
            html: `<p>Dear Student,<br>This is to inform you that a copy of ${bookname} is now available for issuing. Visit the student portal and issue the book as soon as possible. Kindly withdraw your name from the waiting list if you do not wish to borrow the book.</p><p>Regards,<br>VJTI Library</p>`,
        }, function (err, info) {
            if (err){
                console.log(err);
            }
            else {
            console.log("Sent" + info.response);
            }
        })
}