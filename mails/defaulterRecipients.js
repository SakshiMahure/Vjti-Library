const mongoose = require('mongoose');
const Student = require('../models/student');
const getdate = require('../utilities/getdate');

module.exports = async() => {
    let recipients = [];
    const defaulterDate = getdate(-14);
    const students = await Student.find().populate('issuedBooks');
    for (let s of students){
        if ((s.issuedBooks).length !== 0){
            for (let b of s.issuedBooks){
                if (defaulterDate >= b.deadline)
                { 
                    recipients.push(s.email); 
                    await Student.findByIdAndUpdate(s._id, { $set: { blacklisted: true }});
                }
            }
        }        
    }
    return recipients;
}