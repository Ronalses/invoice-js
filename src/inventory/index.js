const page = require('page')
const empty = require('empty-element')
const $ = require('jquery')
require('datatables')(window, $)
require('../lib/dataTables.material.min')(window, $)
const form = require('./components/form')
// const table = require('./components/table')
const template = require('./template')

page('/inventario', () => {
  let main = document.querySelector('main')
  empty(main).appendChild(template(form()))
  componentHandler.upgradeDom()
})
