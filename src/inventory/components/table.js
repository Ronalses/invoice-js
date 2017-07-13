const yo = require('yo-yo')
const $ = require('jquery')
const page = require('page')

module.exports = (dashData) => {
  // LISTENER BUTTONS
  $(document).ready(function () {
    let dataTable = $('#listInvetory').DataTable()

    dataTable.on('click', '.edit', function () {
      let $tr = $(this).closest('tr')
      let data = dataTable.row($tr).data()
      console.log(data[0])
      page.redirect(`/inventario/${data[0]}`)
    })

    dataTable.on('click', '.remove', function () {
      let $tr = $(this).closest('tr')
      let data = dataTable.row($tr).data()
      dataTable.row($tr).remove().draw()
      console.log(data[0])
    })
  })
  // table template
  return yo`
  <div class = 'mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col'>
    <table id="listInvetory" class="mdl-data-table mdl-cell mdl-cell--12-col mdl-data-table--selectable" cellspacing="0">
      <thead>
        <tr>
          <th>Código</th>
          <th>Producto</th>
          <th>Estado</th>
          <th>Agregado</th>
          <th>Precio</th>
          <th class="disabled-sorting">Actions</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Código</th>
          <th>Producto</th>
          <th>Estado</th>
          <th>Agregado</th>
          <th>Precio</th>
          <th class="disabled-sorting">Actions</th>
        </tr>
      </tfoot>
      <tbody>
      </tbody>
    </table>
  </div>
  `
}
