const yo = require('yo-yo')

const chart = require('./components/chart')
const card = require('./components/card')

module.exports = (dashData) => {
  return yo`
        <div class="mdl-grid demo-content">
            <div class="mdl-cell mdl-cell--12-col mdl-grid">
                ${chart(dashData.quotation)}
                ${chart(dashData.purchases)}
                ${chart(dashData.clientSupended)}
                ${chart(dashData.cancellations)}
            </div>
            <div class="mdl-cell mdl-cell--12-col mdl-grid">
                ${card(dashData.nodes)}
                ${card(dashData.paymentsIssued)}
                ${card(dashData.newClients)}
                ${card(dashData.issuedInvoices)}
            </div>
        </div>
  `
}
