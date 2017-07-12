const fs = require('fs')

exports.add = (req, res) => {
  let json = JSON.parse(fs.readFileSync(`${__dirname}/../BDFake/products.json`, 'utf8'))
  json.products.push(req.body)
  json = JSON.stringify(json, null, '    ')
  fs.writeFile(`${__dirname}/../BDFake/products.json`, json, 'utf8', () => {
    res.status(200).json({ message: 'product create' })
  })
}

exports.get = (req, res) => {
  let code = req.params.code
  let json = JSON.parse(fs.readFileSync(`${__dirname}/../BDFake/products.json`, 'utf8'))
  let products = json.products
  for (let i in products) {
    if (code === products[i].code) {
      return res.status(200).json(products[i])
    }
  }
  res.status(200).json({ message: 'no se encontro el usuario' })
}

exports.edit = (req, res) => {
  // if boby is not null
  if (JSON.stringify(req.body) === '{}') {
    return res.status(400).json({ error: true, message: 'error code' })
  }

  let code = req.params.code
  let json = JSON.parse(fs.readFileSync(`${__dirname}/../BDFake/products.json`, 'utf8'))
  let product = req.body
  let products = json.products

  for (let i in products) {
    // Search product for code
    if (code === products[i].code) {
      products[i] = product
      json.products = products
      json = JSON.stringify(json, null, '    ')
      fs.writeFile(`${__dirname}/../BDFake/products.json`, json, 'utf8', () => {
        return res.status(200).json({ message: 'product update' })
      })
    }
  }
}

exports.delete = (req, res) => {
  let code = req.params.code
  let json = JSON.parse(fs.readFileSync(`${__dirname}/../BDFake/products.json`, 'utf8'))
  let products = json.products
  products = products.filter(function (product) {
    if (product.code !== code) {
      return product
    }
  })
  json.products = products
  json = JSON.stringify(json, null, '    ')
  fs.writeFile(`${__dirname}/../BDFake/products.json`, json, 'utf8', () => {
    return res.status(200).json({ message: 'user delete' })
  })
}
exports.all = (req, res) => {
  let products = JSON.parse(fs.readFileSync(`${__dirname}/../BDFake/products.json`, 'utf8'))
  res.status(200).json(products)
}
