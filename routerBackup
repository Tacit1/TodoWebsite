const express = require('express');     //express Modul wird eingebunden
const router = express.Router();        //Paket aus dem express modul wird eingebunden. Hiermit werden anfragen verwaltet
const Member = require('./models/members');
const Calendar = require ('./models/calendar');
const {check, validationResult} = require ('express-validator');
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')


//custom validator to check if username is already used (for signup)
const checkUsernameExists = (value) => {
    return new Promise((resolve, reject) => {
        Member.findOne({ username: value }, (err, user) => {
            if (user) {
                reject('already in use');
            }
            resolve();
        });
    })
}
//signup
router.post('/signup',[
    check('fullname', 'Name is required').notEmpty(),
    check('username', 'Username is required').notEmpty(),
    check('username', 'Username already in use').custom(checkUsernameExists),
    check('password', 'Password is required').notEmpty()
        ], function (req, res, next) {

    const member = new Member(req.body)
    const errors = validationResult(req)

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

//login
router.post('/login',async(req, res) => {
 const{username, password} = req.body

    Member.findOne({username}, (err, user) => {
     if(err|| !user) {
         return res.status(400).json ({
             error:"Username was not found"
         })
     }
     //Authenticate user
        if (!user.authenticate){
            return res.status(400).json({
                error:"Username and password do not match"
            })
        }

        //create token
            const token = jwt.sign({_id: user._id}, process.env.SECRET)

        //Put token in cookie
        res.cookie('token', token,{expires: new Date()+1})

        //Send response to frontend
        const {_id, username} = user
        return res.json({
            token,
            user: {
                _id,
                username
            }
        })
    })
})

router.post('/logout',async(req, res) => {
    res.clearCookie('token')
    return res.json({
        message: "User signout successful"
    })
})

// get all calendar entries
router.get('/calendar', async(req, res) => {
    const allcalendarentries = await Calendar.find();
    console.log(allcalendarentries);
    res.send(allcalendarentries);
});

module.exports = router;