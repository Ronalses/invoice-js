const yo = require('yo-yo')
// const page = require('page')
const $ = require('jquery')
// const modal = require('../../lib/mdl-jquery-modal-dialog.js')

module.exports = (producto) => {
  loadData('')
  return yo`
    <div class='mdl-cell mdl-cell--7-col mdl-color--white mdl-shadow--2dp'>
      <header class='mdl-layout__header'>
        <div class='mdl-grid'>
          <h2 class="mdl-layout-title">Agrega un nuevo producto</h2>
        </div>
      </header>
      <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
        <form id="form" onsubmit=${onsubmit} enctype="" name="myform">
          <div class="mdl-tabs__panel is-active" id="data1">
            <div class='mdl-grid formPanel' id="panel1">
              <div class="mdl-textfield mdl-js-textfield mdl-cell--5-col">
                <input class="mdl-textfield__input" type="number" id="code" required='true'>
                <label class="mdl-textfield__label" for="code">Código</label>
              </div>
              <div class="mdl-textfield mdl-js-textfield mdl-cell--5-col">
                <input class="mdl-textfield__input" type="text" id="name" required='true'>
                <label class="mdl-textfield__label" for="name">Nombre</label>
              </div>
              <div class="mdl-textfield mdl-js-textfield mdl-cell--5-col">
                <input class="mdl-textfield__input" type="text" id="state" required='true'>
                <label class="mdl-textfield__label" for="state">estado</label>
              </div>
              <div class="mdl-textfield mdl-js-textfield mdl-cell--5-col">
                <input class="mdl-textfield__input" type="number" id="price" required='true'>
                <label class="mdl-textfield__label" for="price">Precio</label>
              </div>
            </div>
            <div class='mdl-grid formButonContainer'>
              <button class="mdl-button mdl-button--raised mdl-button--colored" type='submit'>
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
  function onsubmit (ev) {
    ev.preventDefault()
    let data = {
      code: this.code.value,
      name: this.name.value,
      state: this.state.value,
      price: this.price.value
    }

    data = JSON.stringify(data)
    console.log(data)
  }

  function loadData (product) {
    $(document).ready(function () {
      $('#code').val('12134')
      $('#name').val('antena')
      $('#state').val('existente')
      $('#price').val('22342')
    })
  }
}
