const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    Uname: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type : String,
        required: true
    },

    Address :{
        type: String,
        require: true
    },
    Phone : {
        type: String,
        require: true
    }


});


const User = mongoose.model('Users', userSchema);

module.exports = User;