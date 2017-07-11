const page = require('page')
const empty = require('empty-element')
const $ = require('jquery')
require('datatables')(window, $)
require('../lib/dataTables.material.min')(window, $)
const form = require('./components/form')
const table = require('./components/table')
const template = require('./template')

page('/inventario', () => {
  let main = document.querySelector('main')
  empty(main).appendChild(template(form()))
  componentHandler.upgradeDom()
})

page('/inventario/:ci', loadProduct, editProduct)

page('/listainventario', () => {
  let main = document.querySelector('main')
  empty(main).appendChild(table())
  $('#listInvetory').DataTable({
    'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
    responsive: true,
    language: {
      search: '_INPUT_',
      searchPlaceholder: 'Buscar'
    },
    'processing': true
  })
})

function editProduct (ctx) {
  let main = document.querySelector('main')
  empty(main).appendChild(template(form(ctx.client)))
  componentHandler.upgradeDom()
}

async function loadProduct (ctx, next) {
  console.log(ctx.params.ci)
  console.log('cargando producto')
  let data = {
    code: '12341234',
    name: 'antena',
    state: 'activo',
    price: '12345'
  }
  ctx.client = data
  next()
}
