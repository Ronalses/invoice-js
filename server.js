const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('view engine', 'pug')
app.get('/', function (req, res) {
  res.render('index')
})

app.get('/inicio', function (req, res) {
  res.render('index')
})

app.get('/cliente', function (req, res) {
  res.render('index')
})

app.get('/test', function (req, res) {
  res.render('index')
})

app.get('/listaclientes', function (req, res) {
  res.render('index')
})

app.listen(3000, function (err) {
  if (err) return console.log('Hubo un error')
  console.log('Darse Escuchando en el puerto 3000')
})
