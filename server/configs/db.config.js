const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.DBURLATLAS)
mongoose
  .connect(process.env.DBURLATLAS, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });