const fs = require('fs')

exports.get = (req, res) => {
  res.status(200).json({
    quotation: 39,
    purchases: 20,
    clientSupended: 62,
    cancellations: 35,
    products: readClients(),
    paymentsIssued: 20,
    newClients: 50,
    issuedInvoices: 90
  })
}

function readClients () {
  let json = JSON.parse(fs.readFileSync(`${__dirname}/../BDFake/products.json`, 'utf8'))
  let products = json.products
  let currentDate = new Date()
  let count = 0
  for (let i in products) {
    let productDate = products[i].date
    productDate = new Date(productDate)
    if (productDate.getMonth() === currentDate.getMonth()) {
      count++
    }
  }
  return count
}
