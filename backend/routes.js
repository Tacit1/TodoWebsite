const express = require('express');     //express Modul wird eingebunden
const router = express.Router();        //Paket aus dem express modul wird eingebunden. Hiermit werden anfragen verwaltet

// eine GET-Anfrage
router.get('/', async(req, res) => {

    res.send({ message: "Hello FIW!" });        //Antwort mit einem JavaScript Objekt
});

module.exports = router;