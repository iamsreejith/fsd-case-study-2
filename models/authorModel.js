
const mongoose = require("mongoose");
const authSchema = new mongoose.Schema({
    authorName: {
        type: String,
        required: true,
        unique: true
    },
    Short: {
        type : String,
        required: true
    },

    Long :{
        type: String,
        require: true
    },
    authorBooks : {
        type: String,
        require: true
    }


});

const Author = mongoose.model('Author', authSchema);

module.exports = Author;