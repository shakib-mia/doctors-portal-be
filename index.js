const express = require('express');
// import express from 'express'
const jwt = require('jsonwebtoken')
require('dotenv').config();
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send('Welcome To Doctors Portal Server');
});

app.get('/register', (req, res) => {
    const { name, email } = req.headers;

    const user = { name, email }

    const token = jwt.sign(user, process.env.token, { expiresIn: 3600 });

    res.send({ token })
})

app.get("/user", (req, res) => {
    const { token } = req.headers;

    const user = jwt.decode(token)
    res.send(user)
})

app.listen(port, () => console.log(`listening on port: ${port}`))