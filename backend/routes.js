const express = require('express');     //express Modul wird eingebunden
const router = express.Router();        //Paket aus dem express modul wird eingebunden. Hiermit werden anfragen verwaltet
const Member = require('./models/members');

// get all members
router.get('/members', async(req, res) => {
    const allMembers = await Member.find();
    console.log(allMembers);
    res.send(allMembers);       //Array aus allen Members Objekten
});

// get one member via id. In Postman z.B. eingeben GET http://localhost:3000/members/6308a89f67202dcef9316514. hinten steht die ID nach der gesucht wird, davor die Datenbank in der Gesucht wird
router.get('/members/:id', async(req, res) => {
    try {
        const member = await Member.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(member);
    } catch {
        res.status(404);
        res.send({
            error: "Member does not exist!"
        });
    }
})

// post one member  (dafür in Postman in den Body die Postanfrage stellen so wie sie bei get angezeigt wird, ohne ID)
router.post('/members', async(req, res) => {
    const newMember = new Member({
        forename: req.body.forename,
        surname: req.body.surname,
        email: req.body.email
    })
    await newMember.save();
    res.send(newMember);
});

// update one member (in Postman patch, dann localhost:Portnummer/dbName/IDwelcheVerändertWerdenSoll und dann wie bei Post im Bodz eintragen zu was es geändert werden soll)
router.patch('/members/:id', async(req, res) => {
    try {
        const member = await Member.findOne({ _id: req.params.id })

        if (req.body.forename) {
            member.forename = req.body.forename
        }

        if (req.body.surname) {
            member.surname = req.body.surname
        }

        if (req.body.email) {
            member.email = req.body.email
        }

        await Member.updateOne({ _id: req.params.id }, member);
        res.send(member)
    } catch {
        res.status(404)
        res.send({ error: "Member does not exist!" })
    }
});

module.exports = router;