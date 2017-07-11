const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const apiFake = require('./apiFake')

app.use(bodyParser.json())
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

app.get('/listaclientes', function (req, res) {
  res.render('index')
})

app.get('/inventario', function (req, res) {
  res.render('index')
})

app.get('/listainventario', function (req, res) {
  res.render('index')
})

app.get('/test', function (req, res) {
  res.render('index')
})

app.use('/api', apiFake)
app.listen(3000, function (err) {
  if (err) return console.log('Hubo un error')
  console.log('Darse Escuchando en el puerto 3000')
})
