const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    studentId: {
        type: String, 
        required: true
    },
    point:{
        type: Number, 
        required: false
    },
    correctWord:{
        type: Number, 
        required: false
    },
    errorWord:{
        type: Number, 
        required: false
    },
}, {collection: 'User'});

const User = mongoose.model('User', userSchema);

module.exports = User;