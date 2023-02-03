const nodemailer = require('nodemailer');
const overdueRecipients = require('./overdueRecipients');

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: 'VJTIlibrary@outlook.com',
        pass: 'vjtiLib2023'
    }
});

let recipients = [];

module.exports = async() => {
    recipients = await overdueRecipients();
    if ((recipients.length) === 0) {
        console.log("No recipients detected");
    }
    else {
        transporter.sendMail({
            from: 'VJTIlibrary@outlook.com',
            to: recipients,
            subject: "Warning! Book(s) overdue!",
            html: "<p>Dear Student,<br>This to bring to your notice that your issued library book is overdue by 7 days. Return the book at the earliest to avoid being blacklisted and suspension of library privileges.</p><p>Regards,<br>VJTI Library</p>",
        }, function (err, info) {
            if (err){
                console.log(err);
            }
            else {
            console.log("Sent" + info.response);
            }
        })
    }
}