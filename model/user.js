
const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
    fullname: {
        type: String,
        require: true,
    },
    email: {type: String, require: true},
    password: {type: String, require:true},
    userType: {type: String},

}, { collection: 'user' });

const model = mongoose.model("UserModel", UserSchema)

module.exports = model