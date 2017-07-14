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

page('/listainventario', loadProducts, (ctx, next) => {
  let main = document.querySelector('main')
  empty(main).appendChild(table())
  $('#listInvetory').DataTable({
    'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
    responsive: true,
    language: {
      search: '_INPUT_',
      searchPlaceholder: 'Buscar'
    },
    'processing': true,
    'aaData': ctx.products
  })
})

function editProduct (ctx) {
  let main = document.querySelector('main')
  empty(main).appendChild(template(form(ctx.client)))
  componentHandler.upgradeDom()
}

async function loadProduct (ctx, next) {
  console.log(ctx.params.ci)
  try {
    console.log('cargando producto')
    let data = await fetch(`/api/product/${ctx.params.ci}`).then(res => res.json())
    ctx.client = data
    next()
  } catch (error) {
    console.log(error)
  }
}

// load products for api
async function loadProducts (ctx, next) {
  try {
    let data = await fetch('/api/products').then(res => res.json())
    let products = data.products.map((product) => {
      let d = new Date(product.date)
      let date = d.toLocaleDateString()
      let productProcess = [
        product.code,
        product.name,
        product.quantity,
        date,
        product.price,
        `<button class='mdl-button mdl-button--icon like'><i class='material-icons' style='color:#46b8da'>dvr</i></button>
        <button class='mdl-button mdl-button--icon edit'><i class='material-icons' style='color:#f0ad4e'>mode_edit</i></button>
        <button class='mdl-button mdl-button--icon remove'><i class='material-icons' style='color:#d9534f'>delete</i></button>`
      ]
      return productProcess
    })
    ctx.products = products
    next()
  } catch (error) {
    console.log(error)
  }
}
