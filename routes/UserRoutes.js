const express = require('express');
const userModel = require('../models/User');
const app = express();
const path = require("path")

app.post('/', async (req, res) => {

    try {
        const { username, password } = req.body

        const user = await userModel.findOne({ username });
        if (!user) {
            res.status(404).send(`Username '${username}' not found`);
        }
        else if (user.password !== password) {
            res.status(401).send('Incorrect password');
        }
        else {
            res.send('Login successful');
        }

    }
    catch (err) {
        if (err) {
            res.status(500).send(err)
        }
    }
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'signup.html'));
});

app.post('/signup', async (req, res) => {

    const { username, firstname, lastname, password } = req.body

    const newUser = new userModel({ username, firstname, lastname, password })

    try {
        const user = await newUser.save()
        res.status(201).send('User signed up successfully')
    } catch (err) {
        if (err.code === 11000) {
            res.status(409).send('User already exists')

        }
        else if (err) {
            const error = err.errors.firstname ? err.errors.firstname.message :
                err.errors.lastname ? err.errors.lastname.message :
                    err.errors.password ? err.errors.password.message :
                        'An error occurred while saving the user';

            res.status(400).send(error);
        }
        else{
            res.status(500).send(err)
        }
    }
})

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'chat.html'));
});

module.exports = app