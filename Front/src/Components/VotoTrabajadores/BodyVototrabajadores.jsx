import React from 'react'
// ------------
import { useEffect, useState } from "react";
import { AxiosPost, AxiosGet, AxiosConfitVotar } from "../../Helpers/FetchAxios/FetchAxios.jsx";
import axios from "axios";
import { Box, Button, TextField, Select,InputLabel, MenuItem, Alert, Stack, Collapse, Autocomplete, Grid, 
  Typography, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl,
  IconButton ,InputAdornment , FormHelperText, OutlinedInput } from '@mui/material'
  // icon material 
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// css
import  './FormLogin.css'
import '../../assets/Css/FormStep.css'
// services
import {servidor} from '../../Services/server.jsx';
// js
import { nextformstep,beforeformstep } from '../../assets/JS/FormStep'
import {expresionsRegulars,Cedula_Expression} from '../../assets/JS/ExpresionRegulares.js'
// helpers
import PadStartCiudadano from '../../Helpers/Ciudadano/PadStartCiudadano'

// sidebard
import Sidebar from '../../Routers/Sidebar';


const styleCampos = {
  width: "100%",
};

const btnactive = {
  color:'#E20000',

}
const btninactiveactive = {
  color:'#000',

}
const cuadroactive = {
  right: '0',
  transform: 'translate(0%)',
  transition: 'all 0.5s ease' ,
}

const none_ubicacion_prop_second = {
  display:'none'
}

function BodyRegisterUser({user}) {


  
  // HOOK DE USUARIO A
  const [cedulaAsistente,setCedulaAsistente] = useState({dato:null,error : false,message : '',color:null,fucosed: null});
  const [selectnacAsistente,setSelectNacAsistente] = useState('');
  const [asistente,setAsistente] = useState({});
  const [listdirecciones, setListDirecciones] = useState([]);
  const [selecdireccion, setSelecDireccion] = useState([]);
  const [diseabledBuscarCiudadano,setDiseabledBuscarCiudadano] = useState(true);
  const [openppoder, setOpenppoder] = useState(false);
  const [openppoder2, setOpenppoder2] = useState(false);
  // contraseña de usuario
  const [password,setPassword] = useState({dato:null,error : false,message : '',color:null,fucosed: null});
  // FORMULARIO DE VOTO
  const [messagevoto, setMessageVoto] = useState('');
  const [voto, setVoto] = useState('');
  const [diseabledVoto,setDiseabledVoto] = useState(true) // desabilitar btn registrar establecimiento


  // -------------------------
  // -----------LISTADOS DEL Direccion asistente--------------

  const List_Direccion=  () => {
    const url =`${servidor}Ciudadanos/ListDireccionAsistente/Table`;
    AxiosGet(url,setListDirecciones)
  };
  useEffect(() => {
    List_Direccion();
  }, []);


  

  // BUCAR PODER DE EMPRESA
  const datos_asistente = async () =>{

    let datacedula = `${selectnacAsistente + PadStartCiudadano(cedulaAsistente.dato)}`
    const DataAsistenteciudadano = {
        cedulanac : datacedula,
        iddireccion : selecdireccion.id_direccion
    }
    const url = `${servidor}Ciudadanos/Ciudadano/Table`
  
    const resp = await axios.post(url,JSON.stringify(DataAsistenteciudadano))
    const resp_data = await resp.data
    const obj_value = Object.values(resp_data) 
    // console.log(DataAsistenteciudadano)
    if (resp_data && obj_value.length > 0 ) {
        setAsistente({
            nac_cedula :resp_data.nac_cedula,
            nombre_apellido :resp_data.nombre_apellido,
            nombre_estado :resp_data.nombre_estado,
            sexo :resp_data.sexo,
            nombre_carg :resp_data.nombre_carg,
            direccion_general :resp_data.direccion_general,
            ubicacion_fisica :resp_data.ubicacion_fisica,
            // fecha_nacimiento :resp_data[0].fecha_nacimiento.split(/[-/]/).reverse().join("/"),
            


        })
        setOpenppoder(!openppoder);
        setOpenppoder2(false);
        // console.log(resp_data)
        if(resp_data.asistio === 1 || resp_data.asistio == '1'){
          setDiseabledVoto(true);
          setMessageVoto('Este Ciudadano ya participó exitosamente!')
          setVoto('success')
        }else{
          setDiseabledVoto(false);
          setMessageVoto('Este Ciudadano no ha participado!')
          setVoto('warning')
        }
      
        
    }else{
      setOpenppoder(false);
      setOpenppoder2(!openppoder2);
        return false
        
    }
    // tableData()
  }
 
  const HandleSubmitPoder = (e) =>{
    e.preventDefault()
    datos_asistente()
  
  }

  //  --------------------------------
  // ------------REGISTRAR VOTO -----------
  // ------------------------------

  const Votar_Asistente = () =>{
    let cedula = asistente.nac_cedula
    let datacedula = cedula.replace(/[A-Za-z]+0*/g, '')
    const dataasistentevoto ={
      cedula :  datacedula
    }
    
    const url =`${servidor}Votacion/Votar/UpdateVotar`
    AxiosConfitVotar(url,dataasistentevoto,`Ciudadano: ${asistente.nombre_apellido}, ¿ Esta seguro de participar ?`,`Su participación sera satisfatoriamente procesada`,`Si, Participar!`,'Participó','Ha participado satisfatoriamente',datos_asistente)

    
  }
  
  const HandleSubmitVotar = (e) =>{
    e.preventDefault()
    Votar_Asistente()

    
    // onClose()
    
  }
 

  
   
    // *---------------------------------------------------
    // * VALIDATE CAMPO EXPRESIONES REGULARES -
    // *---------------------------------------------------

    const validatecedulaAsistente_ivss = (value) => {
      Cedula_Expression(value,setCedulaAsistente)
    } 
     

 
  // *---------------------------------------------------
  // * VALIDACION DE CAMPOS VACIOS REGISTRO
  // *---------------------------------------------------

  
    // BUSCAR CIUDADANO EMPRESA IVSS
       // -----campos select para validar que no esten vacios estos campos
    const select_direccion = document.getElementById('select_direccion');

    useEffect(() =>{
      if(!expresionsRegulars.numberRegex.test(cedulaAsistente.dato) || cedulaAsistente.dato === null || cedulaAsistente.dato === undefined ||
          selectnacAsistente.length == 0 || selectnacAsistente == '' || selectnacAsistente == null ||
          selecdireccion.length == 0 || selecdireccion == '' || selecdireccion == null || select_direccion.value.length === 0|| select_direccion.value.length === null

        ){
        setDiseabledBuscarCiudadano(true)
      }else{
        setDiseabledBuscarCiudadano(false)
      }
    },[cedulaAsistente,selectnacAsistente,selecdireccion])

      
    // letra inicial del usuario logeado
  const InicialUser = user.nombre.substr(0 ,1)

  return (
    <>
      <Sidebar
        inicialusario={InicialUser}
        usuario={user.nombre_apellido}
        pkrol={user.pkrol}
      />
      
      <Box component='div' 
            sx={{width:'100%', 
            boxShadow:'8px 8px  6px #ccc, -2px -2px 10px #ccc',borderRadius:'6px',background:'#ffffffd9'}} 
        >

        <Box component='div' sx={{textAlign:'center', my:'1rem',  bgcolor:'#f76262'}}>
          <Typography variant="h6">Registrar Participación del Trabajador</Typography>
        </Box>
        <Box component='div' sx={{textAlign:'center', mb:'1rem',  bgcolor:'#aaa'}}>
            <Alert severity="info" sx={{display:'flex',alignItems:'center',justifyContent:'center'}} >
                <strong>Dirección: Al Seleccionar direccion se refiere al Centro Actual en el que esta laborando el Participante</strong>!
            </Alert>

        </Box>
        <Box component='div' sx={{width:'100%',my:'0.5rem'}}>
                <Alert severity={voto} sx={{display:'flex',alignItems:'center',justifyContent:'center'}} >
                  <strong>{messagevoto}</strong>
                </Alert>
              </Box>



        <Box className = 'Cont_form_step'>

          <Box className='slider_form'>
              {/* slider 1 empresa */}
              

              
                {/* slider de poder de empresa */}
              <Box component='form' className='form_poder' id='form_step'  onSubmit={HandleSubmitPoder}
                sx={{width:'100%',p:'5rem'}}>

                  {/*--------------------  */}
                  {/* Buscar ciudadano poder  */}
                  {/*--------------------  */}
                  <Box>
                      <Box>
                        <Typography variant="p" color='error'><strong>Datos Personales del Ciudadno:</strong> </Typography>
                      </Box>
                      <center>
                          <Grid container spacing={2} sx={{mt:1}}>
                              <Grid item xs={12} md={1.5}>
                                  <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label">Nacionalidad</InputLabel>
                                      <Select sx={styleCampos}
                                          labelId="demo-simple-select-label"
                                          id="select_nacionalidad_poder"
                                          value={selectnacAsistente }
                                          label="Nacionalidad"
                                          onChange={(e) => setSelectNacAsistente(e.target.value)}
                                          >
                                          <MenuItem value='V'>V</MenuItem>
                                          <MenuItem value='E'>E</MenuItem>
                                          
                                      </Select>
                                  </FormControl>
                              </Grid>
                              
                              <Grid item xs={12} md={2}>
                                  <TextField sx={styleCampos}
                                      id="Cédula"
                                      label="Cédula"
                                      value={cedulaAsistente.dato }
                                      onChange={(e) => validatecedulaAsistente_ivss(e.target.value)}
                                      error={cedulaAsistente.error}
                                      helperText ={cedulaAsistente.message}
                                      color={cedulaAsistente.color}
                                      focused={cedulaAsistente.fucosed}
                                                                                    
                                  />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6}>
                                <Autocomplete
                                  // fullWidth
                                    // sx={styleCampos}
                                    id="select_direccion" 
                                    options={listdirecciones}
                                    onChange={(e, newValue) => {
                                        
                                      setSelecDireccion({
                                        id_direccion: newValue ? newValue.id_direccion : null,
                                        nombre_direccion: newValue ? newValue.nombre_direccion : null,
                                      });
                                    }}
                                    getOptionLabel={(option) => option.nombre_direccion}
                                    renderInput={(params) => <TextField {...params} label="Seleccionar Dirección" variant="outlined" />}
                                    
                                />
                              </Grid>
                              <Grid item xs={12} md={2}>    
                                  <Button type="submit" variant="contained" color="primary"sx={{mt:1}}
                                  disabled={diseabledBuscarCiudadano}>
                                      Buscar
                                  </Button>
                              </Grid>
                          </Grid>
                      </center>
                     
                      
                  </Box>
              </Box>
              

              {/* second slider */}
             
          </Box>


        </Box>

        {/* Informacion de ciudadano  */}
        <Box className='cont_collapse' sx={{my:1,p:'1rem'}}>
          <Collapse in={openppoder}>
            <Typography variant="p" color="primary" sx={{mt:3}}>Datos Obtenidos:</Typography>
              <Grid container spacing={2} sx={{my:2}}>
                <Grid item  md={6} >
                    <TextField sx={styleCampos}
                        id="nombreapellido"
                        label="Nombre y Apellido"
                        type="text"
                        value={asistente.nombre_apellido}
                        InputProps={{
                            readOnly: true,
                        }}
                        color="success" focused
                    />
                </Grid>
                <Grid item  md={6} >
                     <TextField sx={styleCampos}
                        id="nombreestado"
                        label="Estado"
                        type="text"
                        value={asistente.nombre_estado}
                        InputProps={{
                            readOnly: true,
                        }}
                        color="success" focused
                    />
                </Grid>
                <Grid item  md={12}>       
                    <TextField sx={styleCampos}
                        id="direccion_general"
                        label="Direccion General"
                        type="text"
                        value={asistente.direccion_general}
                        InputProps={{
                            readOnly: true,
                        }}
                        color="success" focused
                    />
                </Grid>
                <Grid item  md={6}>       
                                      
                    <TextField 
                          fullWidth
                          id="cargotrabajador"
                          label="Cargo"
                          multiline
                          minRows={5}
                          maxRows={10}
                          defaultValue={asistente.nombre_carg}
                          InputProps={{
                              readOnly: true,
                          }}
                          color="success" 
                          focused
                          // variant="filled"
                      />
                </Grid>
                                  
                <Grid item  md={6}>
                    <TextField sx={styleCampos}
                        id="oficina"
                        label="Oficina "
                        multiline
                        minRows={5}
                        maxRows={10}
                        value={asistente.ubicacion_fisica}
                        InputProps={{
                            readOnly: true,
                        }}
                        color="success" focused
                    />     
                </Grid>

              </Grid>
                              
              <br />
              {/* FORMULARIO DE VOTON PARA VOTAR */}
            <Box component='form' onSubmit={HandleSubmitVotar}  >
              {/* <Box component='div' sx={{width:'100%',my:'0.5rem'}}>
                <Alert severity={voto} sx={{display:'flex',alignItems:'center',justifyContent:'center'}} >
                  <strong>{messagevoto}</strong>!
                </Alert>
              </Box> */}
              <Box component='div' sx={{width:'100%',my:'0.5rem'}}>
                  <Button sx={{width:'100%',color:'#fff',backgroundImage: 'linear-gradient(to right top, #de4343, #e04a4a, #e25151, #e35858, #e55f5f)'}} 
                      type="submit" variant="contained" color="primary"
                      disabled={diseabledVoto}>
                    Particpar
                  </Button>
              </Box>
            </Box> 
                              
                              
          </Collapse>  
                          {/* mensaje de error */}
          <Collapse in={openppoder2}>
              <Stack sx={{ width: '100%', mt:1 }} spacing={2}>
                  <Alert severity="warning" >
                    <strong>Los Datos no son Correctos</strong> <strong>." POR FAVOR VERIFIQUE "</strong>!
                  </Alert>
                              
                  {/* <Alert severity="warning" action={
                          <Button color="info" variant='outlined' size="small">
                              Registrar
                          </Button>
                      } ><strong>Los Datos no son Correctos</strong> o <strong>No esta REGISTRADO . " POR FAVOR BERIFIQUE "</strong>!</Alert>
              */}
              </Stack>
          </Collapse> 
                            
        </Box>


      </Box>
    </>
  )
}

export default BodyRegisterUser
