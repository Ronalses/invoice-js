const yo = require('yo-yo')
const $ = require('jquery')
const page = require('page')

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

    dataTable.on('click', '.remove', async function () {
      let $tr = $(this).closest('tr')
      let data = dataTable.row($tr).data()
      let ci = data[0]
      let uri = `/api/client/${ci}`
      console.log(uri)
      try {
        let response = await fetch(uri, {method: 'delete'}).then(res => res.json())
        console.log(response)
        dataTable.row($tr).remove().draw()
        console.log('Eliminando')
      } catch (error) {
        console.log(error)
      }
      console.log(ci)
    })
  })
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
