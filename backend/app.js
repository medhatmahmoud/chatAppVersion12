const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users')

mongoose.connect('mongodb+srv://medhatMahmoud:7YgvQ5g6HrvAsOxD@cluster0-o4ivi.mongodb.net/finallPostApp2?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then((dataa) => {
    console.log('CONNECTED')
}).catch((dataa) => {
    console.log('CANT CONNECTED') 
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/images', express.static(path.join('backend/images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader('Access-Control-Allow-Headers', '*'),
    res.setHeader('Access-Control-Allow-Methods', '*')
    next()
})
app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)
module.exports = app;
