const express = require('express')
const Client = require('./controlers/Client')
const Product = require('./controlers/Product')

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
  .post(Client.add)

router.route('/client/:ci')
  .get(Client.get)
  .put(Client.edit)
  .delete(Client.delete)

router.route('/clients')
  .get(Client.all)

router.route('/product')
  .post(Product.add)
router.route('/product/:code')
  .get(Product.get)
  .put(Product.edit)
  .delete(Product.delete)

router.route('/products')
  .get(Product.all)

module.exports = router
