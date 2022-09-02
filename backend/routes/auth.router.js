const express = require('express');
const router = express.Router();
const {check, validationResult} = require ('express-validator');
const Member = require('../models/members');
const jwt = require('jsonwebtoken');

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
});

router.post('/login', async (req, res) => {
  const{username, password} = req.body
 
     Member.findOne({username}, (err, user) => {
      if(err|| !user) {
          return res.status(400).json ({
              error:"Username was not found"
          })
      }
      //Authenticate user
         if (!user.authenticate(password)){
             return res.status(400).json({
                 error:"Username and password do not match"
             })
         }
 
         //create token
         const token = jwt.sign({_id: user._id, }, process.env.SECRET, {expiresIn: Math.floor(Date.now() / 1000) + (10 * 60)})
         const {_id, username} = user;
         return res.json({
             token,
             user: {
                 _id,
                 username
             }
         })
     })
 })

router.post('/logout', async (req, res) => {

});


module.exports = {
  AuthRouter: router
}
