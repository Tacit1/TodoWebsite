const express = require('express');     //express Modul wird eingebunden
const cors = require('cors');
const mongoose = require('mongoose');  //Datei routes wird eingebunden 
const cookieParser = require ("cookie-parser");
const { MainRouter } = require('./mainRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());            // alle Responses die wir bekommen, wandeln wir in JSON um
app.use(cors());                    // enable cors for all requests
app.use('/', MainRouter);               // hier das was man oben als Datei eingebunden hat
//Use parsing  middleware
app.use(express.json());
app.use(cookieParser())

// connect to mongoDB
console.log("DB Connection", process.env.DB_CONNECTION);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true});
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
