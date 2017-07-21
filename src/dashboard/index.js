const page = require('page')
const empty = require('empty-element')
const EasyPieChart = require('easy-pie-chart')

const template = require('./template')
const dashData = require('./components/dashData')

page('/', loadData, function (ctx, next) {
  var main = document.querySelector('main')
  console.log(main)
  empty(main).appendChild(template(ctx.dashData))
  initCirclePercentage()
})

// Thi functon initialize charts for by class
function initCirclePercentage () {
  let charts = ['.quotationChart', '.purchasesChart', '.clientSupendedChart', '.cancellationsChart']
  for (let i in charts) {
    let divChart = document.querySelector(charts[i])
    EasyPieChart(divChart, {
      lineWidth: 6,
      size: 160,
      scaleColor: false,
      trackColor: 'rgba(255,255,255,.25)',
      barColor: '#1abc9c',
      animate: ({ duration: 5000, enabled: true }),
      data: 50
    })
  }
}

// This functon load data for Server
async function loadData (ctx, next) {
  try {
    let data = await fetch('/api/dashboard').then(res => res.json())
    // Charts
    dashData.quotation.percent = data.quotation
    dashData.purchases.percent = data.purchases
    dashData.clientSupended.percent = data.clientSupended
    dashData.cancellations.percent = data.cancellations
    // Cards
    dashData.products.total = data.products
    dashData.issuedInvoices.total = data.issuedInvoices
    dashData.newClients.total = data.newClients
    dashData.paymentsIssued.total = data.paymentsIssued
    // Add to context
    ctx.dashData = dashData
    next()
  } catch (err) {
    console.log(err)
  }
}
