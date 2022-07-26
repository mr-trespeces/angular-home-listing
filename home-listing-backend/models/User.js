const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Duplicate username Not allowed"],
        minlength: 4,
        trim: true,
        lowercase: true
    },
    firstname: {
        type: String,
        required: [true, 'Please enter firstname'],
        trim: true,
        lowercase: true
        },
    lastname: {
        type: String,
        required: [true, 'Please enter lastname'],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        validate: function(value) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
        }
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Please enter password'],
        trim: true,        

    },
    type: {
        type: String,
        required: [true, "admin or customer type only"],
        enum: ["admin", "customer"],
        trim: true,
        lowercase: true
    },

});

const User = mongoose.model("UserInfo", UserSchema);
module.exports = User;