const yo = require('yo-yo')
const $ = require('jquery')
const page = require('page')
const modal = require('../../lib/mdl-jquery-modal-dialog.js')

module.exports = (dashData) => {
  // LISTENER BUTTONS
  $(document).ready(function () {
    let dataTable = $('#listClients').DataTable()
    dataTable.on('click', '.edit', function () {
      let $tr = $(this).closest('tr')
      let data = dataTable.row($tr).data()
      console.log(data[0])
      page.redirect(`/cliente/${data[0]}`)
    })

    dataTable.on('click', '.remove', function () {
      modal.showDialog({
        title: 'Eliminar',
        text: 'Esta segudo que desea eliminar el cliente?',
        positive: {
          title: 'Ok',
          // Delete client if onClick
          onClick: (ev) => {
            let $tr = $(this).closest('tr')
            let data = dataTable.row($tr).data()
            let ci = data[0]
            clientDelete(ci, dataTable, $tr)
          }
        },
        // Not cancel
        negative: {
          title: 'Cancelar'
        },
        cancelable: false
      })
    })
  })
  async function clientDelete (ci, dataTable, $tr) {
    let uri = `/api/client/${ci}`
    console.log(uri)
    try {
      let response = await fetch(uri, {method: 'delete'}).then(res => res.json())
      console.log(response)
      modal.showDialog({
        title: 'Eliminado',
        text: 'Cliente eliminado',
        positive: {
          title: 'Ok'
        }
      })
      dataTable.row($tr).remove().draw()
    } catch (error) {
      console.log(error)
      modal.showDialog({
        title: 'Oh Oh!',
        text: 'No se ha podido eliminar',
        positive: {
          title: 'Ok'
        }
      })
    }
  }

  return yo`
  <div class = 'mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col'>
    <table id="listClients" class="mdl-data-table mdl-cell mdl-cell--12-col mdl-data-table--selectable" cellspacing="0">
      <thead>
        <tr>
          <th>Cedula</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Direccion</th>
          <th class="disabled-sorting">Actions</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Cedula</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Direccion</th>
          <th class="disabled-sorting">Actions</th>
        </tr>
      </tfoot>
      <tbody>
        <tr>
          <td>27411712</td>
          <td>Ronalses</td>
          <td>Aguilar</td>
          <td>Ronalses@hotmial.com</td>
          <td>Carrera 21</td>
          <td>
            <button class="mdl-button mdl-button--icon like"><i class="material-icons" style="color:#46b8da">dvr</i></button>
            <button class="mdl-button mdl-button--icon edit"><i class="material-icons" style="color:#f0ad4e">mode_edit</i></button>
            <button class="mdl-button mdl-button--icon remove"><i class="material-icons" style="color:#d9534f">delete</i></button>
          </td>
        </tr>
        <tr>
          <td>14232123</td>
          <td>Eliu</td>
          <td>Aguilar</td>
          <td>developer@hotmial.com</td>
          <td>Tierra negra</td>
          <td>
            <button class="mdl-button mdl-button--icon like"><i class="material-icons" style="color:#46b8da">dvr</i></button>
            <button class="mdl-button mdl-button--icon edit"><i class="material-icons" style="color:#f0ad4e">mode_edit</i></button>
            <button class="mdl-button mdl-button--icon remove"><i class="material-icons" style="color:#d9534f">delete</i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `
}
