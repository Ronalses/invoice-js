const yo = require('yo-yo')

module.exports = (card) => {
  // Define card default
  if (!card) {
    card = {
      title: 'Pagos',
      total: 71,
      icon: 'storage',
      color: 'red'
    }
  }
  return yo`
    <div class="cardDashContainer mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--3-col mdl-grid">
        <div class="mdl-cell mdl-cell--5-col">
            <i class="material-icons cardDashIcons" style='color:${card.color}'>${card.icon}</i>
        </div>
        <div class="mdl-cell mdl-cell--7-col">
            <h5 class="cardDashTitle">${card.title}</h5>
            <p class="cardDashDescription">+${card.total}</p>
        </div>
    </div>
  `
}
