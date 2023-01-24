const mongoose = require('mongoose');
const Admin = require('../models/admin');
const admins = require('./admin_seeds');
const bcrypt= require('bcrypt');


mongoose.connect('mongodb://127.0.0.1:27017/vjti-library', 
{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.set('strictQuery', false);

const db= mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});


const seedAdminsDb = async() => {
    await Admin.deleteMany({});
    for (let i=0; i<2; i++)
    {   let pass= (admins[i].password).toString(); 
        let hashpass=await bcrypt.hash(pass, 10) ;
        const a = new Admin({
            username: `${admins[i].username}`,
            email:`${admins[i].email}`,
            password: hashpass,
        })
        await a.save();
    }
}

seedAdminsDb().then( () => {
    mongoose.connection.close();
});