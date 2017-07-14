const yo = require('yo-yo')
const $ = require('jquery')
const page = require('page')
const modal = require('../../lib/mdl-jquery-modal-dialog.js')

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
      modal.showDialog({
        title: 'Eliminar',
        text: 'Esta segudo que desea eliminar el producto?',
        positive: {
          title: 'Ok',
          // Delete product if onClick
          onClick: (ev) => {
            let $tr = $(this).closest('tr')
            let data = dataTable.row($tr).data()
            let code = data[0]
            productDelete(code)
            dataTable.row($tr).remove().draw()
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
  async function productDelete (code) {
    let uri = `/api/product/${code}`
    try {
      let response = await fetch(uri, {method: 'DELETE'}).then(res => res.json())
      console.log(response)
      modal.showDialog({
        title: 'Eliminado',
        text: 'Producto eliminado',
        positive: {
          title: 'Ok'
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
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
