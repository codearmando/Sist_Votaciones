import React, { useState,useEffect } from 'react' 
// LIBRERIA EXCEL
import * as XLSX from 'xlsx';
// LIBRERIA PDF
import jsPDF from "jspdf";
import "jspdf-autotable";  // Importa el complemento

// material ui 
import {Box,Button,TextField,Select,InputLabel,MenuItem,Alert,Stack,Collapse,Grid,Typography, 
  FormControl, Tooltip, IconButton, Autocomplete, Divider} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import MUIDataTable from 'mui-datatables';
import EditIcon from '@mui/icons-material/Edit';
import LoupeIcon from '@mui/icons-material/Loupe';

// HELPERS 
// helpers , node_modules y archivos externos
import PopupComponent from "../../../../Helpers/Modal/PopupComponent";
import axios from 'axios' 
import {AxiosPost,AxiosGet} from '../../../../Helpers/FetchAxios/FetchAxios.jsx'
import { customHeadRender } from '../../../../Helpers/Muidatatable/muidatatable';
import '../../../../assets/Css/muidatatable.css'
import '../../../../assets/Css/Popup.css'

// services
import {servidor} from '../../../../Services/server.jsx';
import BodyDetails from './BodyDetails.jsx';

function BodyCorteIVSS() {
  const [cortesRealizados,setCortesRealizados] = useState([])
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [spiner, setSpiner] = useState(false);

    const [datosAsistentesVotacion, setDatosAsistentesVotacion] = useState()
    const [filterdetailsCorteIvss, setFilterDetailsCorteIvss] = useState({})
    const [listCorteIvss,setListCorteIvss] = useState([])
    
    const [selectDirGeneral,setSelectDirGeneral] = useState([])
    const [selectCorte,setSelectCorte] = useState('')
    const [diseabledBuscarCiudadano,setDiseabledBuscarCiudadano] = useState(true); //disabled btn bubscar

    const [modalNewAlmacen, setModalNewAlmacen] = useState(false)
    const [modalDetatalles, setModalDetatalles] = useState(false)

    const OpenCloseModalNewAlmacen = () => {setModalNewAlmacen(!modalNewAlmacen)}
    const OpenCloseModalDetatalles = () => {setModalDetatalles(!modalDetatalles)}


    const List_CorteIvss = () => {
      const url = `${servidor}CorteIvss/CorteIvss/table`
      AxiosGet(url,setListCorteIvss)
  }
  
  useEffect(() => {
      List_CorteIvss();
  }, []);


  // --------------------------------
    // -----------DETALLES-------
    // -------------
    const DetallesAlmacen = (data) => {
      OpenCloseModalDetatalles()
      setFilterDetailsCorteIvss({
          nrocorte:data[0],
          iddirgeneral:data[1],
          ubicacion_fisica:data[2],
          totalempleados:data[3],
          porcentajeasistieron:data[4],
          porcentajenoasistieron:data[5],
          cantidadasistieron:data[6],
          cantidadnoasistieron:data[7],
          dirgeneral:data[8],
          fechacorte:data[9],
          nombre_estado:data[10]
      })
  }


   
  const columns = [

    {
        name : 'id_corte',
        label : 'CORTE DEL VOTO',
        options:{
          display:"excluded", //ocultar columna
        }
        
    },
    {
        name : 'id_direccion',
        label : 'ID_DIR. GENERAL',
        options:{
          display:"excluded", //ocultar columna
        }
        
    },
    {
        name : 'ubicacion_fisica',
        label : 'UBIC. FÍSICA',
        options:{
          display:"excluded", //ocultar columna
        }
        
    },
    {
        name : 'total_empleados',
        label : 'TOTAL DE EMPLEADOS',
        options:{
          display:"excluded", //ocultar columna
        }
        
    },
    {
        name : 'porcentaje_asistieron',
        label : 'porcentaje asistieron',
        options:{
          display:"excluded", //ocultar columna
        }
        
    },
    {
        name : 'porcentaje_no_asistieron',
        label : 'porcentaje no asistieron',
        options:{
          display:"excluded", //ocultar columna
        }
        
    },
    {
        name : 'cantidad_asistieron',
        label : 'CANTIDAD ASISTIERON',
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
        name : 'cantidad_no_asistieron',
        label : 'CANTIDO NO ASISTIERON',
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
        name : 'direccion_general',
        label : 'DIRECCIÓN GENERAL',
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
        name : 'fecha_corte',
        label : 'FECHA DEL CORTE',
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
        name : 'nombre_estado',
        label : 'ESTADO',
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
                    <Tooltip title='DETALLES'>
                      <IconButton aria-label="LoupeIcon" color='info' onClick={() => DetallesAlmacen(transf_obj)}>
                          <LoupeIcon />
                      </IconButton>
                    </Tooltip>
                    {/* <Tooltip title='Eliminar'>
                      <IconButton aria-label="deleteicon" color='error' onClick={() => DeleteAlmacen(transf_obj)}>
                          <DeleteForeverIcon />
                      </IconButton>
                    </Tooltip> */}
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
      print: true ,
      download: false ,
      viewColumns:true,
      sort:true,
      draggable:true,
      responsive:'standard',
      rowsPerPage: 5,
      rowsPerPageOptions:[5,10,15,20,30,40,50],

      // traducir tabla en español
      textLabels: {
        body: {
          noMatch: 'No se encontraron registros',
          toolTip: 'Ordenar',
        },
        pagination: {
          next: 'Siguiente página',
          previous: 'Página anterior',
          rowsPerPage: 'Filas por página:',
          displayRows: 'de',
        },
        toolbar: {
          search: 'Buscar',
          downloadCsv: 'Descargar CSV',
          print: 'Imprimir',
          viewColumns: 'Ver columnas',
          filterTable: 'Filtrar tabla',
        },
        filter: {
          all: 'Todos',
          title: 'FILTROS',
          reset: 'REINICIAR',
        },
        viewColumns: {
          title: 'Mostrar columnas',
          titleAria: 'Mostrar/Ocultar columnas de la tabla',
        },
        selectedRows: {
          text: 'fila(s) seleccionada(s)',
          delete: 'Borrar',
          deleteAria: 'Borrar filas seleccionadas',
        },
      },

      draggableColumns:{
          enabled:true
      },
  }

  
      
      //*----------- ------------------ 
      //*----------- GENERAR EXCEL 
      //*----------- ------------------ 
      const handleDownloadExcel = () => {
        // Selecciona las columnas específicas que deseos incluir en el Excel y obtengo mis elementos de mi array 
        // mediante el parametro item que representa a cada uno de mis elementos de mi objeto para acceder a ellos.
        const SelectColumnsExport = listCorteIvss.map((item) => ({
          id_corte: ` Corte Nro ${item.id_corte}`,
          cantidad_asistieron: item.cantidad_asistieron,
          porcentaje_asistieron: item.porcentaje_asistieron,
          cantidad_no_asistieron: item.cantidad_no_asistieron,
          porcentaje_no_asistieron: item.porcentaje_no_asistieron,
          ubicacion_fisica: item.ubicacion_fisica,
          direccion_general: item.direccion_general,
          fecha_corte: item.fecha_corte,
          nombre_estado: item.nombre_estado,
          total_empleados: item.total_empleados
        }));

        // Convierte los nombres de las columnas a mayúsculas
        const columnsUppercase = SelectColumnsExport.map(row => {
          const newRow = {};
          for (const key in row) {
            newRow[key.toUpperCase()] = row[key];
          }
          return newRow;
        });
      
        // Convierte los datos seleccionados a formato de hoja de cálculo
        const ws = XLSX.utils.json_to_sheet(columnsUppercase);
      
        // Crea el libro y agrega la hoja de cálculo
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      
        // Descarga el archivo Excel
        XLSX.writeFile(wb, `Cortes del IVSS.xlsx`);
      };
      
      //*----------- ------------------ 
      //*----------- GENERAR PDF 
      //*----------- ------------------ 
      // const handleDownloadPDF = () => {
      //   // Selecciona las columnas específicas que deseos incluir en el Excel
      //   // destructuro el objeto que viene en mi arra datosAsistentesVotacion, sin necesidad de colocar un parametro item 
      //   // que represente y acceda a cada elemento de mi array de objetos
      //   const SelectColumnsExport = listCorteIvss.map(({corte,
      //     cantidad_asistieron,
      //     porcentaje_asistieron,
      //     cantidad_no_asistieron,
      //     porcentaje_no_asistieron,
      //     ubicacion_fisica,
      //     direccion_general,
      //     fecha_corte,
      //     total_empleados,
      //     id_corte}) => ({
      //     corte,
      //     cantidad_asistieron,
      //     porcentaje_asistieron,
      //     cantidad_no_asistieron,
      //     porcentaje_no_asistieron,
      //     ubicacion_fisica,
      //     direccion_general,
      //     fecha_corte,
      //     total_empleados,
      //     id_corte: `Corte Nro ${id_corte}`,
          
      //   }));

      //   const pdf = new jsPDF();
      //   const headColumns = Object.keys(SelectColumnsExport[0]);  // Obtén las columnas dinámicamente
      //   pdf.autoTable({
      //     head: [headColumns],
      //     body: SelectColumnsExport.map((row) => headColumns.map((col) => row[col])),
      //   });
      //   pdf.save(`Cortes del IVSS.pdf`);


      //   // const pdf = new jsPDF();
      //   // pdf.autoTable({
      //   //   head: [columns.map((col) => col.label)],
      //   //   // body: SelectColumnsExport,
      //   //   body: datosAsistentesVotacion.map((row) => columns.map((col) => row[col.name])),
      //   // });
      //   // pdf.save("tabla.pdf");
      // };

  


  return (
    <>
      
      <Box component='div'>
        {/* modal detalles */}
            <Box className='modal_detalles_corteivss'>
                <PopupComponent
                    onClose={OpenCloseModalDetatalles}
                    onOpen={modalDetatalles}
                    title='Detalles del Corte'
                    bodymodal={
                    <BodyDetails
                      nrocorte={filterdetailsCorteIvss.nrocorte}
                      cantidadasistieron={filterdetailsCorteIvss.cantidadasistieron}
                      cantidadnoasistieron={filterdetailsCorteIvss.cantidadnoasistieron}
                      ubicacion_fisica={filterdetailsCorteIvss.ubicacion_fisica}
                      dirgeneral={filterdetailsCorteIvss.dirgeneral}
                      totalempleados={filterdetailsCorteIvss.totalempleados}
                      porcentajeasistieron={filterdetailsCorteIvss.porcentajeasistieron}
                      porcentajenoasistieron={filterdetailsCorteIvss.porcentajenoasistieron}
                      fechacorte={filterdetailsCorteIvss.fechacorte}
                      nombre_estado={filterdetailsCorteIvss.nombre_estado}

                    />
                    }
                />
        </Box>

        {/* Informacion de ciudadano  */}
        <Box className="cont_collapse"  >

              {/* <p>{filter_ubicacion_fisica.map((item) => item.direccion_general)}</p> */}
              <Box component='div' sx={{ width: '100%' }}>
                  <Box component='div' sx={{ textAlign: "right", my:'1rem' }}>
                    {/* BOTON DESCARGAR EXCEL */}
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleDownloadExcel}
                    >
                        Generar Excel
                    </Button>
                    {/* BOTON DESCARGAR PDF */}
                    {/* <Button variant='contained' color='error' onClick={handleDownloadPDF}
                        sx={{ml:1}}>Generar PDF</Button> */}
                  </Box>
                  <MUIDataTable 
                      title={`CORTES REGISTRADOS `}
                      data={listCorteIvss}
                      columns={columns}
                      options={opciones}
                      
                  />
              </Box>
          
        </Box>  


      </Box>
    </>
  )
}

export default BodyCorteIVSS
