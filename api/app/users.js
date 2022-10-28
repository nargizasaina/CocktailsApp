const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const config = require('../config');
const User = require("../models/User");
const axios = require("axios");
const client = new OAuth2Client(config.google.clientId);
const router = express.Router();

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    console.log(req.body);
    if (!user) {
        return res.status(401).send({message: 'Credentials are wrong!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(401).send({message: 'Credentials are wrong!'});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});
    res.send({message: 'Username and password correct!', user});
});

router.post('/facebookLogin', async (req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;
    try{
        const response = await axios.get(debugTokenUrl);

        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect!'});
        }

        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: 'Wrong user id'});
        }

        let user = await User.findOne({facebookId: req.body.id});

        if (!user) {
            user = new User({
                email: req.body.email,
                facebookId: req.body.id,
                displayName: req.body.name,
                avatar: req.body.picture.data.url
            });
        }

        user.generateToken();
        user.save({validateBeforeSave: false});
        return res.send({message: 'Login or register successful!', user});
    } catch (e) {
        return res.status(401).send({message: 'Facebook token incorrect!'});
    }
});

router.post('/googleLogin', async (req, res) => {
    const {token} = req.body;

    try{
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: config.google.clientId,
        });

        console.log(ticket);

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
        await user.save({validateBeforeSave: false});

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
    await user.save({validateBeforeSave: false});

    return res.send({success, user});
});

module.exports = router;