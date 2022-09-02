


const express = require('express');
const router = express.Router();


const { AuthRouter } = require('./routes/auth.router');
const { CalendarRouter } = require('./routes/calender.router');
const { TodoRouter } = require('./routes/todo.router'); 


router.use('/todos', TodoRouter);
router.use('/calendar', CalendarRouter);
router.use('/auth', AuthRouter);



module.exports = {
    MainRouter: router
}