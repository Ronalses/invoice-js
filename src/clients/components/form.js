const yo = require('yo-yo')
const $ = require('jquery')

module.exports = (user) => {
  console.log(user)
  user ? loadData(user) : user = null
  return yo`
    <div class='mdl-cell mdl-cell--9-col mdl-color--white mdl-shadow--2dp'>
      <header class='mdl-layout__header'>
        <div class='mdl-grid'>
          <h2 class="mdl-layout-title">Registro de cliente</h2>
        </div>
      </header>
      <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
        <div class="mdl-tabs__tab-bar">
          <a href="#" class="mdl-tabs__tab is-active" id='tabData1' onclick=${click.bind()}>Paso 1</a>
          <a href="#" class="mdl-tabs__tab" id='tabData2'>Paso 2</a>
          <a href="#" class="mdl-tabs__tab" id='tabData3'>Paso 3</a>
        </div>
        <form id="form" onsubmit=${onsubmit} enctype="" name="myform">
          <div class="mdl-tabs__panel is-active" id="data1">
            <div class='mdl-grid formPanel' id="panel1">
              <div class="mdl-textfield mdl-js-textfield mdl-cell--3-col">
                <input class="mdl-textfield__input" type="number" id="ci" required='true'>
                <label class="mdl-textfield__label" for="ci">Cedula</label>
              </div>
              <div class="mdl-textfield mdl-js-textfield mdl-cell--5-col">
                <input class="mdl-textfield__input" type="text" id="name" required='true'>
                <label class="mdl-textfield__label" for="name">Nombre</label>
              </div>
              <div class="mdl-textfield mdl-js-textfield mdl-cell--4-col">
                <input class="mdl-textfield__input" type="text" id="lastname" required='true'>
                <label class="mdl-textfield__label" for="lastname">Apellido</label>
              </div>
              <div class="mdl-textfield mdl-js-textfield mdl-cell--8-col">
                <input class="mdl-textfield__input" type="email" id="email">
                <label class="mdl-textfield__label" for="email">Correo</label>
                <span class="mdl-textfield__error">Por favor introduzca un correo electronico</span>
              </div>
            </div>
            <div class='mdl-grid formButonContainer'>
              <button class="mdl-button mdl-button--raised mdl-button--colored" type="button"
                  onclick=${next.bind(this, 'data1', 'tabData1', 'data2', 'tabData2')}>
                Siguiente
              </button>
            </div>
          </div>
          <div class="mdl-tabs__panel" id="data2">
            <div class='mdl-grid formPanel' id="panel2">
              <div class="mdl-textfield mdl-js-textfield mdl-cell--5-col">
                <input class="mdl-textfield__input" type="number" id="cellPhone" required='true'>
                <label class="mdl-textfield__label" for="cellPhone">Telefono</label>
              </div>
              <div class="mdl-textfield mdl-js-textfield mdl-cell--5-col">
                <input class="mdl-textfield__input" type="number" id="cellPhone2" required='true'>
                <label class="mdl-textfield__label" for="cellPhone2">Telefono Altenativo</label>
              </div>
              <div class="mdl-textfield mdl-js-textfield mdl-cell--7-col">
                <textarea class="mdl-textfield__input" type="text" id="address" rows="3" required='true'></textarea>
                <label class="mdl-textfield__label" for="address">Direccion</label>
              </div>
            </div>
            <div class='mdl-grid formButonContainer'>
              <button class="mdl-button mdl-button--raised mdl-button--colored formButton" type="button"
                onclick=${before.bind(this, 'data2', 'tabData2', 'data1', 'tabData1')}>
                Atras
              </button>
              <button class="mdl-button mdl-button--raised mdl-button--colored formButton" type="button"
                  onclick=${next.bind(this, 'data2', 'tabData2', 'data3', 'tabData3')}>
                Siguiente
              </button>
            </div>
          </div>
          <div class="mdl-tabs__panel" id="data3">
            <div class='mdl-grid formPanel' id="panel2">
              <div class="mdl-textfield mdl-js-textfield mdl-cell--7-col">
                <textarea class="mdl-textfield__input" type="text" id="notes" rows="3"></textarea>
                <label class="mdl-textfield__label" for="notes">Notas adicionales</label>
              </div>
            </div>
            <div class='mdl-grid formButonContainer'>
              <button class="mdl-button mdl-button--raised mdl-button--colored formButton" type="button"
                onclick=${before.bind(this, 'data3', 'tabData3', 'data2', 'tabData2')}>
                Atras
              </button>
              <button class="mdl-button mdl-button--raised mdl-button--colored formButton" type="submit">
                Finalizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
  function next (idContent1, idTab1, idContent2, idTab2) {
    if (validateNext(idContent1)) {
      console.log('Todo bien')
      document.getElementById(idContent1).classList.remove('is-active')
      document.getElementById(idTab1).classList.remove('is-active')

      document.getElementById(idContent2).classList.add('is-active')
      document.getElementById(idTab2).classList.add('is-active')
    } else {
      console.log('Complete todos los campos')
    }
  }

  function before (idContent1, idTab1, idContent2, idTab2) {
    document.getElementById(idContent1).classList.remove('is-active')
    document.getElementById(idTab1).classList.remove('is-active')

    document.getElementById(idContent2).classList.add('is-active')
    document.getElementById(idTab2).classList.add('is-active')
  }

  async function onsubmit (ev) {
    ev.preventDefault()
    console.log(this.ci.value)
    let data = {
      ci: this.ci.value,
      name: this.name.value,
      lastname: this.lastname.value,
      email: this.email.value,
      cellPhone: this.cellPhone.value,
      cellPhone2: this.cellPhone2.value,
      address: this.address.value,
      notes: this.notes.value
    }
    // Convert data to JSON
    data = JSON.stringify(data)
    // if edit
    // user ? console.log('vienve por edicion') : null
    // Send data to API
    let uri = `/api/client${user ? `/${user.ci}` : ''}`
    try {
      let response = await fetch(
          uri, {
            // if user new or update
            method: user ? 'PUT' : 'POST',
            body: data,
            headers: {
              'Content-type': 'application/json'
            }
          }).then(res => res.json())

      console.log(response)
    } catch (error) {
      console.log('Error :', error)
    }
  }

  function click (ev) {
    ev.preventDefault()
    console.log('weeey')
  }

  function validateNext (id) {
    let data = document.getElementById(id).getElementsByTagName('input')
    let validate = true
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].checkValidity())
      validate = data[i].checkValidity()
      if (!validate) {
        return validate
      }
    }
    return validate
  }

  function loadData (client) {
    console.log('dentro del load data')
    $(document).ready(function () {
      $('#name').val(client.name)
      $('#ci').val(client.ci)
      $('#lastname').val(client.lastname)
      $('#email').val(client.email)
      $('#cellPhone').val(client.cellPhone)
      $('#cellPhone2').val(client.cellPhone2)
      $('#address').val(client.address)
      $('#notes').val(client.notes)
    })
  }
}
