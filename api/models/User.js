const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {nanoid} = require("nanoid");
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

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
    password: {
        type: String,
        required: true,
    },
    facebookId: String,
    googleId: String,
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

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);
module.exports = User;