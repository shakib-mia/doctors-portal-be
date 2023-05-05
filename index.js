const express = require('express');
// import express from 'express'
const jwt = require('jsonwebtoken')
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000;
const uri = `mongodb+srv://doctor_admin:${process.env.db_pass}@cluster0.qfivt.mongodb.net/?retryWrites=true&w=majority`

// console.log(process.env.db_pass);

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


const verifyJWT = (req, res, send) => {
    const authHeader = req.headers.token;
    // console.log(authHeader);
    if (!authHeader) {
        return res.status(401).send({ message: 'unauthorized' })
    }

    send();
}


const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true, } });

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const collection = client.db('doctors_portal').collection('booking')

        app.get('/appointments', verifyJWT, async (req, res) => {
            const query = {};
            const cursor = collection.find(query)
            const bookings = await cursor.toArray()
            res.send(bookings)
        })

    } finally { }
}
run().catch(console.dir);


app.listen(port, () => console.log(`listening on port: ${port}`))