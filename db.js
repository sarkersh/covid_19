const mongoose = require('mongoose');
const Covid19 = require('./model/worldometer');
const dotenv = require('dotenv').config();



const PORT = process.env.PORT

const myDB = "mongodb+srv://sarkersh:Shakil2023@cluster0.fsnhzuj.mongodb.net/covid_19?retryWrites=true&w=majority"
mongoose.connect(myDB, () => {
    console.log(`mongodb atlas connected at http://localhost:${PORT}`)
}, e => console.log(e))

module.exports = mongoose
