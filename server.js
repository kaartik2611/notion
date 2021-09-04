const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Todo = require('./models/todo')

//static
app.use(express.static(__dirname + '/public'));

//view engine
app.set('view engine', "ejs")

// body parser
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

const dbURL = 'mongodb+srv://kaartik:kaartik@cluster0.rvt1m.mongodb.net/notion-todo?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => console.log('db connected'))
  .catch(err => console.error(err))

app.get('/todo', (req, res) => {
  const todo = new Todo({
    title: 'the first todo'
  })
  todo.save()
    .then(result => {
    res.send(result)
  })
    .catch(err => console.error(err))
})
app.get('/all-todos', (req, res) => {
  Todo.find().sort({ createdAt: 1 })
    .then(result => {
      res.render('all-users', { data: result })
      // res.send(result)
    })
    .catch(err => console.error(err))
})
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000)
