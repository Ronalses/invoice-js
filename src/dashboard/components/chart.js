const yo = require('yo-yo')

module.exports = (chart) => {
  // Define chart default
  if (!chart) {
    chart = {
      title: 'Pays',
      description: 'Monthly sales target',
      class: 'paysChart',
      percent: 71
    }
  }
  return yo`
    <div class="containerChart mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--3-col mdl-grid">
        <div class="textChart">
            <h5 class="titleChart">${chart.title}</h5>
            <p class="descriptionChart">${chart.description}</p>
        </div>
        <div class='${chart.class} chart mdl-cell mdl-cell--12-col mdl-grid' data-percent='${chart.percent}'>
            <h2 class='numberChart'>${chart.percent}%</h2>
        </div>
    </div>
  `
}
