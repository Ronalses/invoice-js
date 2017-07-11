const express = require('express')
const fs = require('fs')
const Client = require('./controlers/Client')

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
  .get(Client.get)
  .put(Client.edit)
  .delete(Client.delete)

router.route('/clients')
  .get(Client.all)

module.exports = router
