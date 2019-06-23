'use strict';

require('dotenv').config();

const express = require('express');
const Q = require('@nmq/q/client');

const app = express();

app.use(express.json());

app.get('/database', (response) => {
  let data = {
    name: 'read',
    message: 'Get me some information Hoss!',
  };

  Q.publish('database', 'read', JSON.stringify(data));
  response.send('get');
});

app.post('/database', (response) => {
  let data = {
    name: 'create',
    message: 'I wanna create me a record in that database, boys!',
  };

  Q.publish('database', 'create', JSON.stringify(data));
  response.send('post');
});

app.put('/database', (response) => {
  let data = {
    name: 'update',
    message: 'I gotta update me this record before them Dukes boys come around again',
  };

  Q.publish('database', 'update', JSON.stringify(data));
  response.send('put');
});

app.delete('/database', (response) => {
  let data = {
    name: 'delete',
    message: 'Shucks! Delete that record Roscoe before Daisy Mae finds it.',
  };

  Q.publish('database', 'delete', JSON.stringify(data));
  response.send('delete');
});

app.use((response) => {
  let data = {
    name: 'error',
    message: 'Boss, I cannot do what you asked. It is erroneous.',
  };
  Q.publish('database', 'error', JSON.stringify(data));
  response.send('error');
});

module.exports = {
  server: app,
  start: () => {
    let PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};
