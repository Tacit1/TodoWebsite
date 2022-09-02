const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let todos = await Todo.find();
    res.send(todos);
  } catch (error) {
      res.status(500).send('Problem getting Todos');
  }
});

router.post('/', async (req , res) => {
    try {
      const {userId, username, text, completed} = req.body;
      let todo = await Todo.create({userId: userId, username, text, completed});
      res.send({message: "todo created", todo});
      
    } catch (error) {
      res.status(500).send('Problem creating Todos');
    }

});

router.put('/:id', async (req, res) => {
    try {
      const { username, text, completed } = req.body;
      let todo = await Todo.findOne({_id: req.params.id});
      await todo.update({...{username, text, completed}});
      res.send({message: "updated", todo});
    } catch (error) {
      res.status(500).send('Error updating the Todo');
    }
})

router.delete('/:id', async (req, res) => {
  try {
    let deleted = await Todo.delete({_id: req.params.id});
    res.send({message: "deleted", deleted});
  } catch (error) {
    res.status(500).send("Error deleting the Todo");
  }
})


module.exports = {
  TodoRouter: router,
}