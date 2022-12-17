const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Student = require('../models/student');
const students = require('./students_seeds');

mongoose.connect('mongodb://127.0.0.1:27017/vjti-library', 
{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.set('strictQuery', false);

const db= mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});


const seedStudentsDb = async() => {
    await Student.deleteMany({});
    for (let i=0; i<4; i++)
    {
        let regPass = (students[i].regId).toString();
        let hashPass = await bcrypt.hash(regPass, 12);
        const s = new Student({
            name: `${students[i].name}`,
            regId: students[i].regId,
            email: students[i].email,
            password: hashPass
        })
        await s.save();
    }
}

seedStudentsDb().then( () => {
    mongoose.connection.close();
});