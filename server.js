
const express = require('express');
const pg = require('pg');
const path = require('path');
const {db, seedDB, People, Places, Things} = require('./db.js');

const PORT = 3000;
const server = express();

server.use(express.json());

server.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

server.get('/api/people', async (req, res, next) => {
    try {
        res.send(await People.findAll());
    }
    catch (e) {
        console.log('error with GET', e);
    }
});

server.get('/api/places', async (req, res, next) => {
    try {
        res.send(await Places.findAll());
    }
    catch (e) {
        console.log('error with GET', e);
    }
});

server.get('/api/things', async (req, res, next) => {
    try {
        res.send(await Things.findAll());
    }
    catch (e) {
        console.log('error with GET', e);
    }
});

db.sync({force: true})
    .then(() => seedDB())
    .then(() => {
        server.listen(PORT, () => {
            console.log('server started');
        })
    })
