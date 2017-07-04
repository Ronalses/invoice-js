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

page('/cliente/:ci', editClient)

page('/listaclientes', () => {
  console.log('cargando cliente')
  let main = document.querySelector('main')
  empty(main).appendChild(table())
  $('#listClients').DataTable({
    'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
    responsive: true,
    language: {
      search: '_INPUT_',
      searchPlaceholder: 'Buscar'
    }
  })

  let dataTable = $('#listClients').DataTable()

  dataTable.on('click', '.edit', function () {
    let $tr = $(this).closest('tr')
    let data = dataTable.row($tr).data()
    console.log(data[0])
    page.redirect(`/cliente/${data[0]}`)
  })

  dataTable.on('click', '.remove', function () {
    let $tr = $(this).closest('tr')
    let data = dataTable.row($tr).data()

    console.log(data[0])
    dataTable.row($tr).remove().draw()
    console.log('Eliminando')
  })
  componentHandler.upgradeDom()
})

function editClient (data) {
  let main = document.querySelector('main')
  empty(main).appendChild(template(form(data.params.ci)))
  componentHandler.upgradeDom()
}
