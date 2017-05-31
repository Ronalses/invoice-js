const page = require('page')
const empty = require('empty-element')

page('/inicio', function (ctx, next) {
  
})

/*
function initCirclePercentage() {
  $('#chartDashboard, #chartOrders, #chartNewVisitors, #chartSubscriptions, #chartDashboardDoc, #chartOrdersDoc').easyPieChart({
    lineWidth: 6,
    size: 160,
    scaleColor: false,
    trackColor: 'rgba(255,255,255,.25)',
    barColor: '#FFFFFF',
    animate: ({ duration: 5000, enabled: true }),
    data: 50
  })
}

async function loadData(ctx, next) {
  try{
    ctx.Data = await fetch('/api/dashboard').then(res => res.json())
    next()
  }catch (err){
    console.log(err)
  }
}
*/
