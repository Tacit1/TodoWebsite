const express = require('express');     //express Modul wird eingebunden
const routes = require('./routes');     //Datei routes wird eingebunden

const app = express();
const PORT = 3000;

app.use(express.json());                // alle Responses die wir bekommen, wandeln wir in JSON um
app.use('/', routes);                   // hier das was man oben als Datei eingebunden hat

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ... `);
    }
});