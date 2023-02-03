const mongoose = require('mongoose');
const Student = require('../models/student');
const getdate = require('../utilities/getdate');

module.exports = async() => {
    let recipients = [];
    const overdueDate = getdate(-7);
    const students = await Student.find().populate('issuedBooks');
    for (let s of students){
        if ((s.issuedBooks).length !== 0){
            for (let b of s.issuedBooks){
                if (overdueDate >= b.deadline)
                { recipients.push(s.email); }
            }
        }        
    }
    return recipients;
}