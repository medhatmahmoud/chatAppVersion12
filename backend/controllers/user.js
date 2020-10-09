const mongoose = require('mongoose')
const bCrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = require('../models/user')


exports.userCreate =  (req, res, next) => {
    bCrypt.hash(req.body.password, 10)
    .then((hashedPassword) => {
        const createdUser = new userSchema({
            _id: mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hashedPassword
        })
        createdUser.save()
    .then((user) => {
        res.json({
            message: 'user created',
            userdata: user
        })
    }).catch((err) => {
        res.status(500).json({
            message: 'Invalid authentication credintials',
            error: err
        })
    })
})
}

exports.userLogin = (req, res) => {
    let featchedUser;
    userSchema.findOne({email: req.body.email})
   .then((user) => {
        if(!user) {
            return res.json({
                message: 'INVALID AUTH3c'
            })
        }
        featchedUser = user;
        return bCrypt.compare(req.body.password, featchedUser.password)
    })
    .then((result) => {
        if(!result) {
            return res.json({
                message: 'INVALID AUTH2'
            })
        }
            
            token = jwt.sign(
            {email: featchedUser.email, userId: featchedUser._id},
             'secret', 
             {expiresIn: '1h'})

            res.json({
                token: token,
                expiresIn: 3600 * 1000,
                userId: featchedUser._id
            });
        
    })
    .catch((err) => {
        res.status(500).json({
            message: 'Invalid authentication credintials',
        })
    })
}
