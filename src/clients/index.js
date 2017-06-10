const page = require('page')
const empty = require('empty-element')

const template = require('./template')

page('/cliente', () => {
  console.log('cargando cliente')
  let main = document.querySelector('main')
  // componentHandler.upgradeElement(template())
  empty(main).appendChild(template())
  componentHandler.upgradeDom()
  setTimeout(() => {
    console.log('cargando')
  }, 1000)
  console.log('Weee')
})
