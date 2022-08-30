const express = require('express');     //express Modul wird eingebunden
const cors = require('cors');
const routes = require('./routes');     //Datei routes wird eingebunden
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());// alle Responses die wir bekommen, wandeln wir in JSON um
// enable cors for all requests
app.use(cors());
app.use('/', routes);                   // hier das was man oben als Datei eingebunden hat

// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://127.0.0.1:27017/members', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected to DB');
});

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ... `);
    }
});