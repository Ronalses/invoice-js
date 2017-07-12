const fs = require('fs')

exports.add = (req, res) => {
  let json = JSON.parse(fs.readFileSync(`${__dirname}/../BDFake/clients.json`, 'utf8'))
  json.clients.push(req.body)
  console.log(json)
  json = JSON.stringify(json, null, '    ')
  fs.writeFile(`${__dirname}/BDFake/clients.json`, json, 'utf8', () => {
    res.status(200).json({ message: 'user create' })
  })
}

exports.get = (req, res) => {
  console.log(req.params.ci)
  let ci = req.params.ci
  let json = JSON.parse(fs.readFileSync(`${__dirname}/../BDFake/clients.json`, 'utf8'))
  let clients = json.clients
  for (let i in clients) {
    if (ci === clients[i].ci) {
      return res.status(200).json(clients[i])
    }
  }
  res.status(404).json({ message: 'no fund user' })
}

exports.edit = (req, res) => {
  // if boby is not null
  if (JSON.stringify(req.body) === '{}') {
    return res.status(400).json({ error: true, message: 'error ci' })
  }

  let ci = req.params.ci
  let json = JSON.parse(fs.readFileSync(`${__dirname}/../BDFake/clients.json`, 'utf8'))
  let client = req.body
  let clients = json.clients

  for (let i in clients) {
    // Search client for ci
    if (ci === clients[i].ci) {
      clients[i] = client
      json.clients = clients
      json = JSON.stringify(json, null, '    ')
      fs.writeFile(`${__dirname}/../BDFake/clients.json`, json, 'utf8', () => {
        return res.status(200).json({ message: 'user update' })
      })
    }
  }
}

exports.delete = (req, res) => {
  console.log(req.params.ci)
  let ci = req.params.ci
  let json = JSON.parse(fs.readFileSync(`${__dirname}/../BDFake/clients.json`, 'utf8'))
  let clients = json.clients
  clients = clients.filter(function (client) {
    if (client.ci !== ci) {
      return client
    }
  })
  json.clients = clients
  json = JSON.stringify(json, null, '    ')
  fs.writeFile(`${__dirname}/../BDFake/clients.json`, json, 'utf8', () => {
    return res.status(200).json({ message: 'user delete' })
  })
}

exports.all = (req, res) => {
  let clients = JSON.parse(fs.readFileSync(`${__dirname}/../BDFake/clients.json`, 'utf8'))
  res.status(200).json(clients)
}
