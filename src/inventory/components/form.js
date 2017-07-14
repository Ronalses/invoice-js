const yo = require('yo-yo')
const page = require('page')
const $ = require('jquery')
const modal = require('../../lib/mdl-jquery-modal-dialog.js')

module.exports = (product) => {
  product ? loadData(product) : product = null
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
                <input class="mdl-textfield__input" type="number" id="quantity" required='true'>
                <label class="mdl-textfield__label" for="quantity">Cantidad</label>
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
  async function onsubmit (ev) {
    modal.showLoading()
    ev.preventDefault()
    let data = {
      code: this.code.value,
      name: this.name.value,
      price: this.price.value,
      quantity: parseInt(this.quantity.value)
    }

    data = JSON.stringify(data)
    console.log(data)
    /**
     * if edit product or create new product
     */
    let uri = `/api/product${product ? `/${product.code}` : ''}`
    try {
      let response = await fetch(
        uri,
        {
          method: product ? 'PUT' : 'POST',
          body: data,
          headers: {
            'Content-type': 'application/json'
          }
        }).then(res => res.json())
      console.log(response)
      resetForm()
    } catch (error) {
      console.log(error)
    }
  }

  function loadData (product) {
    console.log(product.code)
    $(document).ready(function () {
      $('#code').val(product.code)
      $('#name').val(product.name)
      $('#price').val(product.price)
      $('#quantity').val(product.quantity)
    })
  }

  function resetForm () {
    modal.hideLoading()
    modal.showDialog({
      title: 'Guardado',
      text: product ? 'Se actualizo con exito!' : 'Guardado con exito!',
      positive: {
        title: 'Ok',
        onClick: function (ev) {
          product ? page.redirect('/listainventario') : page.redirect('inventario')
        }
      },
      cancelable: false
    })
  }
}
