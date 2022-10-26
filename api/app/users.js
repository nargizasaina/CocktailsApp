const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const config = require('../config');
const User = require("../models/User");
const client = new OAuth2Client(config.google.clientId);
const router = express.Router();

router.post('/googleLogin', async (req, res) => {
    const {token} = req.body;

    try{
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: config.google.clientId,
        });

        const {name, picture, email} = ticket.getPayload();

        let user = await User.findOne({email});

        if (!user) {
            user = new User({
                email,
                displayName: name,
                avatar: picture
            });
        }

        user.generateToken();
        await user.save();

        res.send({message: 'Login or register successful!', user});
    } catch (e) {
        return res.status(401).send({message: 'Google token incorrect!'});
    }
});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save();

    return res.send({success, user});
});

module.exports = router;