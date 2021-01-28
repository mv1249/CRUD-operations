// here i will create a mongodb scheme

// the field name and email are required,so that is set as required,as the geder and status are radio buttons i just need to select any one,so by default it is required!,and we want the email of the user to be unique,so in email i have set the unique as true!


const mongoose = require('mongoose')

var schemea = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: String,
    status: String
})

// creating the model and exporting the model!


const Userdb = mongoose.model('userdb', schemea)

module.exports = Userdb