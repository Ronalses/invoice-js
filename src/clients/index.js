const page = require('page')
const empty = require('empty-element')
const $ = require('jquery')
require('datatables')(window, $)
require('../lib/dataTables.material.min')(window, $)
const form = require('./components/form')
const table = require('./components/table')
const template = require('./template')

page('/cliente', () => {
  console.log('cargando cliente')
  let main = document.querySelector('main')
  // componentHandler.upgradeElement(template())
  empty(main).appendChild(template(form()))
  componentHandler.upgradeDom()
  console.log('Weee')
})

page('/cliente/:ci', loadClient, editClient)

page('/listaclientes', loadForDataTable, (ctx) => {
  console.log('lista clientes', ctx.clients)
  let main = document.querySelector('main')
  empty(main).appendChild(table())
  $('#listClients').DataTable({
    'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
    responsive: true,
    language: {
      search: '_INPUT_',
      searchPlaceholder: 'Buscar'
    },
    'processing': true,
    'aaData': ctx.clients
  })

  let dataTable = $('#listClients').DataTable()

  dataTable.on('click', '.edit', function () {
    let $tr = $(this).closest('tr')
    let data = dataTable.row($tr).data()
    console.log(data[0])
    page.redirect(`/cliente/${data[0]}`)
  })

  dataTable.on('click', '.remove', async function () {
    let $tr = $(this).closest('tr')
    let data = dataTable.row($tr).data()
    let ci = data[0]
    let uri = `/api/client/${ci}`
    console.log(uri)
    try {
      let response = await fetch(uri, {method: 'delete'}).then(res => res.json())
      console.log(response)
      dataTable.row($tr).remove().draw()
      console.log('Eliminando')
    } catch (error) {
      console.log(error)
    }
    console.log(ci)
  })
  componentHandler.upgradeDom()
})

function editClient (ctx) {
  let main = document.querySelector('main')
  empty(main).appendChild(template(form(ctx.client)))
  componentHandler.upgradeDom()
}

// load client for edit
async function loadClient (ctx, next) {
  try {
    console.log(ctx.params.ci)
    console.log('cargando cliente')
    let data = await fetch(`/api/client/${ctx.params.ci}`).then(res => res.json())
    ctx.client = data
    next()
  } catch (error) {
    console.log(error)
  }
}

// load clients
async function loadForDataTable (ctx, next) {
  try {
    console.log('cargando clientes')
    let data = await fetch('/api/clients').then(res => res.json())
    let clients = data.clients.map((client) => {
      let clientProcess = [
        client.ci,
        client.name,
        client.lastname,
        client.email,
        client.address,
        `<button class='mdl-button mdl-button--icon like'><i class='material-icons' style='color:#46b8da'>dvr</i></button>
        <button class='mdl-button mdl-button--icon edit'><i class='material-icons' style='color:#f0ad4e'>mode_edit</i></button>
        <button class='mdl-button mdl-button--icon remove'><i class='material-icons' style='color:#d9534f'>delete</i></button>`
      ]
      return clientProcess
    })

    ctx.clients = clients
    next()
  } catch (error) {
    console.log(error)
  }
}
