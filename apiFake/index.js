const express = require('express')
const fs = require('fs')

const router = express.Router()

router.route('/')
  .get((req, res) => {
    res.status(200).json({ message: 'Hola client' })
  })

router.route('/dashboard')
  .get((req, res) => {
    res.status(200).json({
      quotation: 39,
      purchases: 20,
      clientSupended: 62,
      cancellations: 35,
      nodes: 3,
      paymentsIssued: 20,
      newClients: 50,
      issuedInvoices: 90
    })
  })

// create client
router.route('/client')
  .post((req, res) => {
    let json = JSON.parse(fs.readFileSync(`${__dirname}/BDFake/clients.json`, 'utf8'))
    json.clients.push(req.body)
    console.log(json)
    json = JSON.stringify(json, null, '    ')
    fs.writeFile(`${__dirname}/BDFake/clients.json`, json, 'utf8', () => {
      res.status(200).json({ message: 'user create' })
    })
  })

router.route('/client/:ci')
  .get((req, res) => {
    console.log(req.params.ci)
    let ci = req.params.ci
    let json = JSON.parse(fs.readFileSync(`${__dirname}/BDFake/clients.json`, 'utf8'))
    let clients = json.clients
    for (let i in clients) {
      if (ci === clients[i].ci) {
        return res.status(200).json(clients[i])
      }
    }
    res.status(200).json({ message: 'Hola client' })
  })
  .put((req, res) => {
    // if boby is not null
    if (JSON.stringify(req.body) === '{}') {
      return res.status(400).json({ error: true, message: 'error ci' })
    }

    let ci = req.params.ci
    let json = JSON.parse(fs.readFileSync(`${__dirname}/BDFake/clients.json`, 'utf8'))
    let client = req.body
    let clients = json.clients

    for (let i in clients) {
      // Search client for ci
      if (ci === clients[i].ci) {
        clients[i] = client
        json.clients = clients
        json = JSON.stringify(json, null, '    ')
        fs.writeFile(`${__dirname}/BDFake/clients.json`, json, 'utf8', () => {
          return res.status(200).json({ message: 'user update' })
        })
      }
    }
  })
  .delete((req, res) => {
    console.log(req.params.ci)
    let ci = req.params.ci
    let json = JSON.parse(fs.readFileSync(`${__dirname}/BDFake/clients.json`, 'utf8'))
    let clients = json.clients
    clients = clients.filter(function (client) {
      if (client.ci !== ci) {
        return client
      }
    })
    json.clients = clients
    json = JSON.stringify(json, null, '    ')
    fs.writeFile(`${__dirname}/BDFake/clients.json`, json, 'utf8', () => {
      return res.status(200).json({ message: 'user delete' })
    })
  })

router.route('/clients')
  .get((req, res) => {
    let clients = JSON.parse(fs.readFileSync(`${__dirname}/BDFake/clients.json`, 'utf8'))
    res.status(200).json(clients)
  })

module.exports = router
