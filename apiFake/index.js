const express = require('express')

const router = express.Router()

router.route('/')
  .get((req, res) => {
    res.status(200).json({message: 'Hola client'})
  })

router.route('/dashboard')
  .get((req, res) => {
    res.status(200).json({
      quotation: 3,
      purchases: 20,
      clientSupended: 102,
      cancellations: 35,
      nodes: 3,
      paymentsIssued: 20,
      newClients: 50,
      issuedInvoices: 90
    })
  })

module.exports = router
