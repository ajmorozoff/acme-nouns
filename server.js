
const express = require('express');
const path = require('path');
const {connection, seed} = require('./db.js');

const PORT = 3000;
const server = express();

server.use(express.json());

server.use(express.static(__dirname));

server.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

server.get('/api/people', async (req, res, next) => {
    try {
        const response = await connection.People.findAll();
        res.send(response);
    }
    catch (e) {
        console.log('error with GET', e);
    }
});

server.get('/api/places', async (req, res, next) => {
    try {
        res.send(await connection.Places.findAll());
    }
    catch (e) {
        console.log('error with GET', e);
    }
});

server.get('/api/things', async (req, res, next) => {
    try {
        res.send(await connection.Things.findAll());
    }
    catch (e) {
        console.log('error with GET', e);
    }
});

connection.sync({force: true})
    .then(() => seed())
    .then(() => {
        server.listen(PORT, () => {
            console.log('server started');
        })
    })
