const mongoose = require('mongoose');
const {nanoid} = require("nanoid");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        required: true,
        unique: true,
        type: String,
        validate: {
            validator: async value => {
                const user = await User.findOne({email: value});
                if (user) return false;
            },
            message: 'The user is already registered!',
        },
    },
    googleId: {
        required: true,
        type: String
    },
    token: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    role: {
        required: true,
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    },
    avatar: String
});

UserSchema.methods.generateToken = function () {
    this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);
module.exports = User;