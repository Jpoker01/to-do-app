const express = require('express');
const uuid = require('uuid');
const cors = require('cors');
const bcrypt = require('bcrypt');

const mongo_connection = require('../../../config/database');

const userModel = require('../../models/user_schema')
const router = express.Router();

router.use(cors());
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    userModel.findOne({ username: username })
        .then(user => {
            if (!user) {
                return res.status(404).send('User not found');
            }

            bcrypt.compare(password, user.password)
                .then(result => {
                    if (result) {
                        res.send({ message: 'Login success', user: user });
                    } else {
                        res.status(400).send({ message: 'Wrong credentials' });
                    }
                });
        })
        .catch(error => {
            res.status(500).send({ message: 'Internal Server Error' });
        });
});

router.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    userModel.findOne({ username: username })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).send({ message: 'User already exists!' });
            }
        });

    bcrypt.genSalt(10)
        .then(salt => {
            bcrypt.hash(password, salt)
                .then(hash => {
                    const newUser = new userModel({
                        username: username,
                        password: hash,
                        email: email,
                        salt: salt
                    });

                    newUser.save()
                        .then(savedUser => {
                            res.status(200).send(savedUser);
                        })
                        .catch(error => {
                            res.status(500).send({ message: 'New user could not be registered' });
                        });
                });
        });
        
        
});

module.exports = router;