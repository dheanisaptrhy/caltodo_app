const express = require('express')
const { addTodo, getTodo, getTodos, updateTodo, deleteTodo, updateCheck } = require('../controllers/note')
const router = express.Router()

router.post('/todo', addTodo)
router.get('/todo/:id', getTodo)
router.get('/todos', getTodos)
router.patch('/todoo/:id', updateCheck)
router.patch('/todo/:id', updateTodo)
router.delete('/todo/:id', deleteTodo)

module.exports = router