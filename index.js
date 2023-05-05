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

app.post('/register', (req, res) => {
    console.log(req.body);

})

app.listen(port, () => console.log(`listening on port: ${port}`))