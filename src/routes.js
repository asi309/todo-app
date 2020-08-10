const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('hello from express');
});

module.exports = routes;