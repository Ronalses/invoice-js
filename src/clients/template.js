const yo = require('yo-yo')

const form = require('./components/form')

module.exports = (dashData) => {
  return yo`
        <div class="mdl-grid demo-content center-items">
          ${form()}
        </div>
  `
}
