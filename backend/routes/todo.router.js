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

router.get('/user/:id', async (req, res) => {
  try{
    const {id} = req.params;
    let todosForUser = await Todo.find({userId: id});
    return res.send(todosForUser);
  }catch(error){
    console.log("error getting todos for user", error)
    res.status(500).send("Error getting todos for user");
  }
})

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
    let deleted = await Todo.deleteOne({_id: req.params.id});
    res.send({message: "deleted", deleted});
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Error deleting the Todo");
  }
})


module.exports = {
  TodoRouter: router,
}