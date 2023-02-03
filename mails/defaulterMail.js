const nodemailer = require('nodemailer');
const defaulterRecipients = require('./defaulterRecipients');

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
    recipients = await defaulterRecipients();
    if ((recipients.length) === 0) {
        console.log("No recipients detected");
    }
    else {
        transporter.sendMail({
            from: 'VJTIlibrary@outlook.com',
            to: recipients,
            cc: "librarianTejal@gmail.com",
            subject: "Warning!!",
            html: "<p>Dear Student,<br>This is to inform that you have been blacklisted and will not be allowed to issue books from VJTI library on account of not returning previously issued books.</p><p>Regards,<br>VJTI Library</p>",
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