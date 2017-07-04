const yo = require('yo-yo')

module.exports = (data) => {
  return yo`
        <div class="mdl-grid demo-content center-items">
          ${data}
        </div>
  `
}
