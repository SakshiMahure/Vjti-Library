const nodemailer = require('nodemailer');
const reminderRecipients = require('./reminderRecipients');

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
    recipients = await reminderRecipients();
    if ((recipients.length) === 0) {
        console.log("No recipients detected");
    }
    else {
        transporter.sendMail({
            from: 'VJTIlibrary@outlook.com',
            to: recipients,
            subject: "Due date reminder!",
            html: "<p>Dear Student,<br>This to remind you that the due date for returning the library book is in 2 days. Return the book in time to avoid any late fee charges.</p><p>Regards,<br>VJTI Library</p>",
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