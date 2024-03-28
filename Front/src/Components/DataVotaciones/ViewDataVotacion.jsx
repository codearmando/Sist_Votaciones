import React, { useState,useEffect } from 'react' 

// LIBRERIA EXCEL
import * as XLSX from 'xlsx';
// LIBRERIA PDF
import jsPDF from "jspdf";
import "jspdf-autotable";  // Importa el complemento

import {Box,Button,TextField,Select,InputLabel,MenuItem,Alert,Stack,Collapse,Grid,Typography, 
        FormControl, Tooltip, IconButton, Autocomplete} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import MUIDataTable from 'mui-datatables';
import EditIcon from '@mui/icons-material/Edit';
import LoupeIcon from '@mui/icons-material/Loupe';


// HELPERS 
// helpers , node_modules y archivos externos
import PopupComponent from "../../Helpers/Modal/PopupComponent";
import axios from 'axios' 
import {AxiosPost,AxiosGet} from '../../Helpers/FetchAxios/FetchAxios.jsx'
import { customHeadRender } from '../../Helpers/Muidatatable/muidatatable';
import '../../assets/Css/muidatatable.css'
import '../../assets/Css/Popup.css'

// services
import {servidor} from '../../Services/server.jsx';
// sidebard
import Sidebar from '../../Routers/Sidebar';
import BodyDetailsVotacion from './BodyDetailsVotacion.jsx';

function ViewDataVotacion({user}) {

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [spiner, setSpiner] = useState(false);

    const [datosAsistentesVotacion, setDatosAsistentesVotacion] = useState()
    const [filterdetailsAsistentesVotacion, setFilterDetailsAsistentesVotacion] = useState({})
    const [listubicacionFisica,setListUbicacionFisica] = useState([])
    
    const [selectubicacionFisica,setSelectUbicacionFisica] = useState([])
    const [selectVoto,setSelectVoto] = useState('')
    const [diseabledBuscarCiudadano,setDiseabledBuscarCiudadano] = useState(true); //disabled btn bubscar

    const [modalNewAlmacen, setModalNewAlmacen] = useState(false)
    const [modalDetatalles, setModalDetatalles] = useState(false)

    const OpenCloseModalNewAlmacen = () => {setModalNewAlmacen(!modalNewAlmacen)}
    const OpenCloseModalDetatalles = () => {setModalDetatalles(!modalDetatalles)}

    const List_UbicacionFisica = () => {
        const url = `${servidor}DataVotaciones/ListUbicacionFisica/Table`
        AxiosGet(url,setListUbicacionFisica)
    }
    
    useEffect(() => {
        List_UbicacionFisica();
    }, []);

    // BUSCAR ASISTENTE POR CEDULA 
    
    const datos_Asistente_votacion = async () => {

        const dataCiudadano = {
            id_ubica: selectubicacionFisica.id_ubica,
            voto: selectVoto,
        };
  
        const url = `${servidor}AsistentesVotacion/AsistenteVotacion/Table`
  
        const resp = await axios.post(url, JSON.stringify(dataCiudadano));
        const resp_data = await resp.data;
        const obj_value = Object.values(resp_data) 

        if (resp_data && obj_value.length > 0 ) {
            setDatosAsistentesVotacion(resp_data);
            setOpen(!open);
            setOpen2(false);
            setSpiner(false)
        } else {
            setOpen(false);
            setOpen2(!open2);
            setSpiner(false)
            return false;
        }
        // setSpiner(false)
        // tableData()
    }
    const HandleSubmitCiudadano = (e) =>{
        e.preventDefault()
        datos_Asistente_votacion()
        setSpiner(true)
        // console.log(rows)
    }
    

  
    // --------------------------------
    // -----------NEW MEDICAMENTOS-------
    // -------------
    const DetallesAlmacen = (data) => {
        OpenCloseModalDetatalles()
        setFilterDetailsAsistentesVotacion({
            cedula:data[0],
            sexo:data[1],
            dirgeneral:data[2],
            ubicfisica:data[3],
            estado:data[4],
            voto:data[5],
            nombreapellido:data[7],
            cargo:data[8],
        })
    }

    
    const columns = [

        {
            name : 'nac_cedula',
            label : 'NRO CÉDULA',
            options:{
              display:"excluded", //ocultar columna
            }
            
        },
        {
            name : 'sexo',
            label : 'SEXO',
            options:{
              display:"excluded", //ocultar columna
            }
            
        },
        {
            name : 'direccion_general',
            label : 'DIR. GENERAL',
            options:{
              display:"excluded", //ocultar columna
            }
            
        },
        {
            name : 'ubicacion_fisica',
            label : 'UBIC. FISICA',
            options:{
              display:"excluded", //ocultar columna
            }
            
        },
        {
            name : 'nombre_estado',
            label : 'ESTADO',
            options:{
              display:"excluded", //ocultar columna
            }
            
        },
        {
            name : 'asistio',
            label : 'VOTO',
            options:{
              display:"excluded", //ocultar columna
            }
            
        },
        {
            name : 'id_corte',
            label : 'CORTE DEL VOTO',
            options:{
              display:"excluded", //ocultar columna
            }
            
        },
        {
            name : 'nombre_apellido',
            label : 'NOMBRE Y APELLIDO',
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
            name : 'cargo',
            label : 'CARGO DEL TRABAJADOR',
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
        const SelectColumnsExport = datosAsistentesVotacion.map((item) => ({
          nac_cedula: item.nac_cedula,
          nombre_apellido: item.nombre_apellido,
          sexo: item.sexo,
          direccion_general: item.direccion_general,
          cargo: item.cargo,
          nombre_estado: item.nombre_estado,
          ubicacion_fisica: item.ubicacion_fisica,
          asistio: item.asistio === 1 ? 'Si Voto' : 'No voto'
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
        XLSX.writeFile(wb, `${selectubicacionFisica.nombre}.xlsx`);
      };
      
      //*----------- ------------------ 
      //*----------- GENERAR PDF 
      //*----------- ------------------ 
      const handleDownloadPDF = () => {
        // Selecciona las columnas específicas que deseos incluir en el Excel
        // destructuro el objeto que viene en mi arra datosAsistentesVotacion, sin necesidad de colocar un parametro item 
        // que represente y acceda a cada elemento de mi array de objetos
        const SelectColumnsExport = datosAsistentesVotacion.map(({nac_cedula,
          nombre_apellido,
          sexo,
          direccion_general,
          cargo,
          nombre_estado,
          ubicacion_fisica,
          asistio}) => ({
          nac_cedula,
          nombre_apellido,
          sexo,
          direccion_general,
          cargo,
          nombre_estado,
          ubicacion_fisica,
          asistio: asistio === 1 ? 'Si Voto' : 'No voto'
        }));

        const pdf = new jsPDF();
        const headColumns = Object.keys(SelectColumnsExport[0]);  // Obtén las columnas dinámicamente
        pdf.autoTable({
          head: [headColumns],
          body: SelectColumnsExport.map((row) => headColumns.map((col) => row[col])),
        });
        pdf.save(`${selectubicacionFisica.nombre}.pdf`);


        // const pdf = new jsPDF();
        // pdf.autoTable({
        //   head: [columns.map((col) => col.label)],
        //   // body: SelectColumnsExport,
        //   body: datosAsistentesVotacion.map((row) => columns.map((col) => row[col.name])),
        // });
        // pdf.save("tabla.pdf");
      };


      
  // *---------------------------------------------------
  // * VALIDACION DE CAMPOS VACIOS REGISTRO
  // *---------------------------------------------------

  
    // BUSCAR CIUDADANO EMPRESA IVSS
       // -----campos select para validar que no esten vacios estos campos
    const select_ubic_fisica = document.getElementById('select_ubic_fisica');
    const select_voto = document.getElementById('select_voto');

    useEffect(() =>{
      if(
          selectubicacionFisica.length == 0 || selectubicacionFisica == '' || selectubicacionFisica == null || select_ubic_fisica.value.length === 0|| select_ubic_fisica.value === null ||
          selectVoto.length == 0 || selectVoto == '' || selectVoto == null 

        ){
        setDiseabledBuscarCiudadano(true)
      }else{
        setDiseabledBuscarCiudadano(false)
      }
    },[selectubicacionFisica,selectVoto])

  
  // letra inicial del usuario logeado
  const InicialUser = user.nombre.substr(0 ,1)

  return (
    <>
        {/* <p>{user.nombre_apellido}</p> */}
        <Sidebar
          inicialusario={InicialUser}
          usuario={user.nombre_apellido}
          pkrol={user.pkrol}
        />

        

        <Box className='modal_detalles_paciente'>
          <PopupComponent
            onClose={OpenCloseModalDetatalles}
            onOpen={modalDetatalles}
            title='Detalles Paciente'
            bodymodal={
              <BodyDetailsVotacion
              cedula={filterdetailsAsistentesVotacion.cedula}
              nombre_apellido={filterdetailsAsistentesVotacion.nombreapellido}
              sexo={filterdetailsAsistentesVotacion.sexo}
              cargo={filterdetailsAsistentesVotacion.cargo}
              direccion_general={filterdetailsAsistentesVotacion.dirgeneral}
              ubicacion_fisica={filterdetailsAsistentesVotacion.ubicfisica}
              estado_ubicacion={filterdetailsAsistentesVotacion.estado}
              voto={filterdetailsAsistentesVotacion.voto}

              />
            }
          />
        </Box>


        {/*--------------------  */}
        {/* Buscar ubicacion fisica   */}
        {/*--------------------  */}
        
        <Box sx={{width:'100%'}}
                component="form"
                className="form_ciudadano"
                id="form_step"
                onSubmit={HandleSubmitCiudadano}
            >

            <Box sx={{width:'100%'}}>
            <Box sx={{width:'100%',bgcolor:'#ffffff',p:'1rem',boxShadow:'2px 2px 6px #ccc',}}>
                <Box id='subheader-global'>
                  <Typography variant="h6" color="initial" sx={{color:'#fff',py:1}}>
                      Buscar Información de la participación de distitnas <strong>Oficinas/Hospitales/Centros/...</strong>
                  </Typography>
                </Box>
                <Grid container spacing={2} >
                <Grid item xs={12} md={9}>
                    <Autocomplete 
                            fullWidth
                            // sx={styleCampos}
                            id="select_ubic_fisica" 
                            options={listubicacionFisica}
                            onChange={(e, newValue) => {
                                
                                setSelectUbicacionFisica({
                                    id_ubica : newValue ? newValue.id_ubica : null,
                                    nombre: newValue ? newValue.nombre : null,
                                });
                            }}
                            getOptionLabel={(option) => option.nombre}
                            renderInput={(params) => <TextField {...params} label="Seleccionar Centro/oficina/Hospital/etc" variant="outlined" />}
                            // freeSolo
                    />

                    
                    
                </Grid>
                <Grid item xs={12} md={1}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Participaron:</InputLabel>
                            <Select
                                fullWidth
                                // sx={styleCampos}
                                labelId="demo-simple-select-label"
                                id="select_voto"
                                value={selectVoto}
                                label="Asistieron al voto:"
                                onChange={(e) => setSelectVoto(e.target.value)}
                            >
                                <MenuItem value="1">Si</MenuItem>
                                <MenuItem value="0">No</MenuItem>
                            </Select>
                        </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                    <LoadingButton type="submit" variant="contained" loading={spiner}
                    // loadingPosition="start"
                    // loadingIndicator='Cargando...'
                    sx={{ mt: 1 }}
                    disabled={diseabledBuscarCiudadano}
                    >
                    Buscar
                    </LoadingButton>
                </Grid>
                </Grid>
                {/* Informacion de ciudadano  */}
                <Box className="cont_collapse"  >
                            {/* datos en tabla */}
                            <Collapse in={open}>
                                <Typography variant="p" color="primary" sx={{ mt: 3 }}>
                                    Datos Obtenidos:
                                </Typography>

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
                                      <Button variant='contained' color='error' onClick={handleDownloadPDF}
                                        sx={{ml:1}}>Generar PDF</Button>
                                    </Box>
                                    <MUIDataTable 
                                        title={"TRABAJADORES DEL IVSS"}
                                        data={datosAsistentesVotacion}
                                        columns={columns}
                                        options={opciones}
                                        
                                    />
                                </Box>
            
                            </Collapse>
                            {/* mensaje de error */}
                            <Collapse in={open2}>
                                <Stack sx={{ width: "100%", mt: 1 }} spacing={2}>
                                    <Alert severity="warning">
                                    <strong>NO HAY DATOS DE PARTICIPANTES</strong>
                                    <strong>" POR FAVOR VERIFIQUE "</strong>!
                                    </Alert>
                                </Stack>
                            </Collapse>
                </Box>
            </Box>
                
            </Box>

        </Box>
    </>
  )
}

export default ViewDataVotacion
