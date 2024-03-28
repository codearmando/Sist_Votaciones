import { Box, IconButton,Button, Tooltip } from '@mui/material';
import { useEffect, useState } from "react"; 
// MATERIAL UI 
import MUIDataTable from 'mui-datatables';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import BodyAddAlmacen from "./BodyAddAlmacen";
import BodyUpdate from './BodyUpdate';
import BodyDelete from './BodyDelete';

// HELPERS 
import { AxiosGet } from "../../Helpers/FetchAxios/FetchAxios";
import PopupComponent from "../../Helpers/Modal/PopupComponent";
import { customHeadRender } from '../../Helpers/Muidatatable/muidatatable';
import '../../assets/Css/muidatatable.css'

import Sidebar from '../../Routers/Sidebar';


function ViewAlmacen({user}) {

    const [tabla, setTabla] = useState()
    const [dataeditar,setDataEditar] = useState({})

    const [modalNewAlmacen, setModalNewAlmacen] = useState(false)
    const [modalupdate, setModalUpdate] = useState(false)

    const OpenCloseModalNewAlmacen = () => {setModalNewAlmacen(!modalNewAlmacen)}
    const OpenCloseModalUpdate = () => {setModalUpdate(!modalupdate)}

    const tableData = () =>{
        const url = 'http://localhost/farmacia_Alto_Costo/app/almacen/almacen/table'
        AxiosGet(url,setTabla)
    }

    useEffect(() =>{
        tableData()
    },[])


    
    // --------------------------------
    // -----------NEW MEDICAMENTOS-------
    // -------------
    const AddAlmacen = () => {
        OpenCloseModalNewAlmacen()
    }
    // --------------------------------
    // -----------UPDATE ALMACEN-------
    // -------------
    const UpdateAlmacen = (data) => {
        
        const updateAlmacen = tabla.filter((item) => 
            item.PK_ALMACEN == data[0]
        )
        console.log('updateAlmacen: ',updateAlmacen)
        setDataEditar({
          pk_almacen : data[0],
          tipo_almacen : updateAlmacen[0].TIPO_ALMACEN,
          piso : updateAlmacen[0].PISO,
          pasillo: updateAlmacen[0].PASILLO,
          observacion : updateAlmacen[0].OBSERVACION,
          estatus : updateAlmacen[0].ESTATUS,
        })
        OpenCloseModalUpdate()
    }

    // --------------------------------
    // -----------DELETE MEDICAMENTOS-------
    // -------------

    const DeleteAlmacen = (data) =>{
      BodyDelete(data[0],data[1],tableData)
    }


    const columns = [

        {
            name : 'PK_ALMACEN',
            label : 'PK_ALMACEN',
            options:{
              display:"excluded", //ocultar columna
            }
        },
        {
          name : 'TIPO_ALMACEN',
          label : 'TIPO DE ALMACEN',
          options:{
                customHeadRender: (columnMeta, handleToggleColumn) => {
                  return customHeadRender(columnMeta, handleToggleColumn)
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                  return <div className="celdas_data">{value}</div>
                },
          }
        },
        {
          name : 'PISO',
          label : 'UBICACION DE PISO',
          options:{
                customHeadRender: (columnMeta, handleToggleColumn) => {
                  return customHeadRender(columnMeta, handleToggleColumn)
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                  return <div className="celdas_data">{value}</div>
                },
              }
        },
        {
          name : 'PASILLO',
          label : 'PASILLO',
          options:{
                customHeadRender: (columnMeta, handleToggleColumn) => {
                  return customHeadRender(columnMeta, handleToggleColumn)
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                  return <div className="celdas_data">{value}</div>
                },
              }
        },
        {
          name : 'ESTATUS',
          label : 'ESTATUS',
          options:{
                customHeadRender: (columnMeta, handleToggleColumn) => {
                  return customHeadRender(columnMeta, handleToggleColumn)
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                  return <div className="celdas_data">{value}</div>
                },
              }
        },
        {
          name : 'Action',
          label : 'ACCIONES',
          options:{
            customHeadRender: (columnMeta, handleToggleColumn) => {
              return customHeadRender(columnMeta, handleToggleColumn)
            },
            customBodyRender:(value, tableMeta, updateValue) =>{
                const transf_obj = Object.assign({},tableMeta.rowData)
                return (
                    <>
                      <div className="celdas_data">
                        <Tooltip title='Editar'>
                          <IconButton aria-label="editicon" color='info' onClick={() => UpdateAlmacen(transf_obj)}>
                              <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Eliminar'>
                          <IconButton aria-label="deleteicon" color='error' onClick={() => DeleteAlmacen(transf_obj)}>
                              <DeleteForeverIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
    
                    </>
                )
            }
            
        }
        },
    
      ]

    const opciones ={
    
        filterType: 'checkbox',
        // fixedHeader: true,
        selectableRows: false ,// o none
        // selectableRowsOnClick: true,
        filter:true,
        search:true,
        searchPlaceholder:'Buscar..',
        // searchAlwaysOpen:true,
        print: false ,
        download: false ,
        viewColumns:true,
        sort:true,
        draggable:true,
        responsive:'standard',
        rowsPerPage: 5,
        rowsPerPageOptions:[5,10,15,20,30,40,50],
    
        draggableColumns:{
            enabled:true
        },
      }

  
  // OBTENER INICIAL DEL NOMBRE DEL USUARIO
  const InicialUser = user.usuario.substr(0 ,1)

  return (
    <>
      <Sidebar
        inicialusario={InicialUser}
        usuario={user.usuario}
      />
        <Box className='Container_almacen' >

            <Box className='modal_add_almacen'>
                <PopupComponent
                    onOpen={modalNewAlmacen}
                    title='Registrar Almacen'
                    onClose={OpenCloseModalNewAlmacen}
                    bodymodal={
                    <BodyAddAlmacen
                        onClose={OpenCloseModalNewAlmacen}
                        tableData={tableData}
                    />
                    }
                />
            </Box>
          
            <Box className='modal_update_almacen'>
                <PopupComponent
                    onOpen={modalupdate}
                    title='Modificar Almacen'
                    onClose={OpenCloseModalUpdate}
                    bodymodal={
                    <BodyUpdate
                        onClose={OpenCloseModalUpdate}
                        tableData={tableData}

                        pkalmacen ={dataeditar.pk_almacen}
                        tipoalmacen ={dataeditar.tipo_almacen}
                        piso ={dataeditar.piso}
                        pasillo={dataeditar.pasillo}
                        observacion ={dataeditar.observacion}
                        estatus ={dataeditar.estatus}
                    />
                    }
                />
            </Box>


            {/* --------------------------------------------- */}
            {/* --------------registrar nuevo medicamento --------- */}
            {/* ------------------------------------------------ */}
            <Box className='Acorden_menu' sx={{mt:'1rem'}}>
                <Button variant="contained" color="error" startIcon={<AddCircleOutlineSharpIcon />} onClick={AddAlmacen} >
                    Registrar Almacen
                </Button>
            </Box>

            <Box component='div' sx={{margin:'2rem 0'}}>
                <MUIDataTable 
                    sx={{textAlign:'center'}}
                    title={"ALMACEN"}
                    data={tabla}
                    columns={columns}
                    options={opciones}
                />
            </Box>
        </Box>
    </>
  )
}

export default ViewAlmacen