import {AxiosDelete } from '../../Helpers/FetchAxios/FetchAxios.jsx'

function BodyDelete(pkalmacen,tipo_almacen,tableData) {
  
    const url = 'http://localhost/farmacia_Alto_Costo/app/almacen/almacen/Delete'
    const almacenDelete = {
        pkalmacen : pkalmacen,
    }
    
    console.log(almacenDelete)

    AxiosDelete(url,almacenDelete,`${tipo_almacen}`,tableData)
    tableData()
  
}

export default BodyDelete