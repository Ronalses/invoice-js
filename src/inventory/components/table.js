const yo = require('yo-yo')

module.exports = (dashData) => {
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
        <tr>
          <td>12341234</td>
          <td>antena</td>
          <td>activo</td>
          <td>21/08/17</td>
          <td>1232</td>
          <td>
            <button class="mdl-button mdl-button--icon like"><i class="material-icons" style="color:#46b8da">dvr</i></button>
            <button class="mdl-button mdl-button--icon edit"><i class="material-icons" style="color:#f0ad4e">mode_edit</i></button>
            <button class="mdl-button mdl-button--icon remove"><i class="material-icons" style="color:#d9534f">delete</i></button>
          </td>
        </tr>
        <tr>
          <td>12333334</td>
          <td>mouse</td>
          <td>activo</td>
          <td>21/08/17</td>
          <td>1122</td>
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
