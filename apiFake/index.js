const express = require('express')

const router = express.Router()

router.route('/')
  .get((req, res) => {
    res.status(200).json({message: 'Hola client'})
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

router.route('/client')
  .post((req, res) => {
    console.log(req.body) // no recibe el body!!
    res.status(200).json({message: 'user create'})
  })

module.exports = router
