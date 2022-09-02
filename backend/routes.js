const express = require('express');     //express Modul wird eingebunden
const router = express.Router();        //Paket aus dem express modul wird eingebunden. Hiermit werden anfragen verwaltet
const Member = require('./models/members');
const Calendar = require ('./models/calendar');
const {check, validationResult} = require ('express-validator/check');
const expressValidator = require ('express-validator');
const {isEmpty} = require('express-validator');

router.use(expressValidator({
        customValidators: {
            isUsernameAvailable(username) {
                return new Promise((resolve, reject) => {
                    Member.findOne({ username: username }, (err, member) => {
                        if (err) throw err;
                        if(member == null) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                });
            }
        }
    })
);
//signup
router.post('/signup',(req, res) => {
    const member = new Member(req.body)
    const errors = validationResult(req)

    req.check('username', 'Username is required').notEmpty();
    req.check('username', 'Username already in use').isUsernameAvailable();
    req.check('password', 'Password is required').notEmpty();

    if (!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    member.save((err, member)=> {
        if(err) {
            return res.status(400).json({
                error: "Unable to add member"
            })
        }
        return res.json({
            message:"Success",
            member
        })
    })
})


// get all members
router.get('/members', async(req, res) => {
    const allMembers = await Member.find();
    console.log(allMembers);
    res.send(allMembers);       //Array from all Members objects
});

// get all calendar entries
router.get('/calendar', async(req, res) => {
    const allcalendarentries = await Calendar.find();
    console.log(allcalendarentries);
    res.send(allcalendarentries);
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
        fullname: req.body.forename,
        username: req.body.surname,
        password: req.body.email
    })
    await newMember.save();
    res.send(newMember);
});

// update one member (in Postman patch, dann localhost:Portnummer/dbName/IDwelcheVerändertWerdenSoll und dann wie bei Post im Bodz eintragen zu was es geändert werden soll)
router.patch('/members/:id', async(req, res) => {
    try {
        const member = await Member.findOne({ _id: req.params.id })

        if (req.body.fullname) {
            member.forename = req.body.forename
        }

        if (req.body.username) {
            member.surname = req.body.surname
        }

        if (req.body.password) {
            member.email = req.body.email
        }

        await Member.updateOne({ _id: req.params.id }, member);
        res.send(member)
    } catch {
        res.status(404);
        res.send({ error: "Member does not exist!" })
    }
});

module.exports = router;