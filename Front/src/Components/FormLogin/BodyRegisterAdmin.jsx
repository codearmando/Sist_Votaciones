import React from 'react'
// ------------
import { useEffect, useState } from "react";
import { AxiosPost, AxiosGet } from "../../Helpers/FetchAxios/FetchAxios.jsx";
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
import {expresionsRegulars,Password_Expression,Rif_Expression,Texto_Expression,
        Tlf_First_Expression,Tlf_Second_Expression,Email_First_Expression,Email_Second_Expression,Text_number_Expressions,
        number_Expressions,MaxText_number_Expression,LimiteDe_Text_Number_Expression,Cedula_Expression} from '../../assets/JS/ExpresionRegulares.js'
// helpers
import PadStartCiudadano from '../../Helpers/Ciudadano/PadStartCiudadano'

// sidebard
import Sidebar from '../../Routers/Sidebar';

const styleCampos = {
  width: "100%",
};

function BodyRegisterAdmin({user}) {


  
  // HOOK DE USUARIO A
  const [cedulaAsistente,setCedulaAsistente] = useState({dato:null,error : false,message : '',color:null,fucosed: null});
  const [selectnacAsistente,setSelectNacAsistente] = useState('');
  const [asistente,setAsistente] = useState({});
  const [listdirecciones, setListDirecciones] = useState([]);
  const [selecdireccion, setSelecDireccion] = useState([]);

  const [listroles, setListRoles] = useState([]);
  const [selecroles, setSelecRoles] = useState([]);

  const [diseabledBuscarCiudadano,setDiseabledBuscarCiudadano] = useState(true);
  const [openppoder, setOpenppoder] = useState(false);
  const [openppoder2, setOpenppoder2] = useState(false);
  // contraseña de usuario
  const [password,setPassword] = useState({dato:null,error : false,message : '',color:null,fucosed: null});
  const [diseabledNextContrasena,setDiseabledNextContrasena] = useState(true)
  //  ocultar y mostrar password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  

  // -------------------------
  // -----------LISTADOS--------------

  const List_Roles=  () => {
    const url =`${servidor}Login/Roles/Table`;
    AxiosGet(url,setListRoles)
  };
  const List_Direccion=  () => {
    const url =`${servidor}Ciudadanos/ListDireccionAsistente/Table`;
    AxiosGet(url,setListDirecciones)
  };
  useEffect(() => {
    List_Direccion();
    List_Roles();
  }, []);


  

  // BUCAR CIUDADANO DE DIRECICONES A VOTAR
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
  // ------------REGISTRAR USUARIO-----------
  // ------------------------------


  
  const RegisterUsuario =  () =>{
    const objetDataUsuario = {
      ci_asistente: asistente.nac_cedula,
      contrasena : password.dato, 
      pkrol: selecroles.pk_rol

    }

    const url =`${servidor}Login/LoginSession/InsertUsuario`
    AxiosPost(url,objetDataUsuario,`Usuario: ${asistente.nombre_apellido} `,'Registrado','Registrado',null)
 

  }

  const HandleSubmitRegisterUsuario = (e) =>{
    e.preventDefault()
    RegisterUsuario()

    // onClose()
  
  }
  
   
    // *---------------------------------------------------
    // * VALIDATE CAMPO EXPRESIONES REGULARES -
    // *---------------------------------------------------

    const validatecedulaAsistente_ivss = (value) => {
      Cedula_Expression(value,setCedulaAsistente)
    } 
    const validatePassword_empresa = (value) => {
      number_Expressions(value,setPassword)
    }
     

 
  // *---------------------------------------------------
  // * VALIDACION DE CAMPOS VACIOS REGISTRO
  // *---------------------------------------------------

  
    // VALIDACION CAMPOS USUARIOS
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
    
    // VALIDACION CONTRASEÑA EMPRESA
    const select_rol = document.getElementById('select_rol');
    useEffect(() =>{
      if(
        !expresionsRegulars.numberRegex.test(password.dato) || password.dato === null || password.dato === undefined ||
        selecroles.length == 0 || selecroles == '' || selecroles == null || select_rol.value.length === 0|| select_rol.value.length === null
        //  contrasena.dato === undefined || contrasena.dato === null
         ){
          setDiseabledNextContrasena(true)
        }else{
        setDiseabledNextContrasena(false)
      }
    },[password,selecroles])
     
     
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
        sx={{width:'70%',margin:'auto', overflow:'hidden',
            boxShadow:'8px 8px  6px #ccc, -2px -2px 10px #ccc',borderRadius:'6px',background:'#ffffffd9',mb:2}} 
        >

        <Box component='div' sx={{textAlign:'center', my:'1rem',  bgcolor:'#f76262'}}>
          <Typography variant="h6">Crear Usuario Administrativo</Typography>
        </Box>
        <Box component='div' sx={{textAlign:'center', mb:'1rem'}}>
            
            <Alert severity="warning" sx={{display:'flex',alignItems:'center',justifyContent:'center'}} >
                <strong>No se podra registrar un usuario si ya existe con el mismo privilegio</strong>!
            </Alert>

        </Box>



        <Box className = 'Cont_form_step' sx={{p:'1rem'}}>

          <Box className='slider_form'>
              {/* slider 1 empresa */}
              

              
                {/* slider de poder de empresa */}
              <Box component='form' className='form_poder' id='form_step'  onSubmit={HandleSubmitPoder}>

                  {/*--------------------  */}
                  {/* Buscar ciudadano poder  */}
                  {/*--------------------  */}
                  <Box>
                      <Box>
                        <Typography variant="p" color='error'><strong>Datos Personales de Poder de Empresa:</strong> </Typography>
                      </Box>
                      <center>
                          <Grid container spacing={2} sx={{mt:1}}>
                              <Grid item xs={12} md={1.5} sm={3}>
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
                              
                              <Grid item xs={12} md={2} sm={9}>
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
                      {/* Informacion de ciudadano  */}
                      <Box className='cont_collapse' sx={{mt:1}}>
                          <Collapse in={openppoder}>
                              <Typography variant="p" color="primary" sx={{mt:3}}>Datos Obtenidos:</Typography>
                              <Grid container spacing={2} sx={{my:2}}>
                                 
                                <Grid item xs={12} md={6} >
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
                                <Grid item xs={12} md={6} >
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
                                <Grid item xs={12} md={12}>       
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
                                <Grid item xs={12} md={6}>       
                                                      
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
                                  
                                <Grid item xs={12} md={6}>
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
                              <Box 
                                sx={{mt:2,float:'right'}}
                                >
                                {/* <Button variant="contained" id='btn_next' color="warning" sx={{mr:2}} onClick={() => beforeformstep()} >
                                    Volver
                                </Button> */}
                                <Button variant="contained" id='btn_next' color="info" 
                                  onClick={() => nextformstep()} >
                                            
                                    Siguiente
                                </Button>
                              </Box> 
                              
                              
                          </Collapse>  
                          {/* mensaje de error */}
                          <Collapse in={openppoder2}>
                              <Stack sx={{ width: '100%', mt:1 }} spacing={2}>
                                  <Alert severity="warning" >
                                    <strong>Los Datos no son Correctos</strong> o <strong>No esta REGISTRADO . " POR FAVOR VERIFIQUE "</strong>!
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
              </Box>
              

              {/* slider confirmacion de contraseña */}
              <Box component='form' className='form_contrasenauser' id='form_step' onSubmit={HandleSubmitRegisterUsuario}>
                  <Box>
                    <Typography variant="p" color='error'><strong>Ingresar contraseña para el usuario ha crear:</strong> </Typography>
                  </Box>
                  <Box>
                          <center>
                              <Grid container spacing={2} sx={{mt:1}}>
                                  
                                  <Grid item xs={12} md={4}>
                                      <FormControl sx={styleCampos} variant="outlined">
                                        {password.error ? (
                                          
                                          <InputLabel htmlFor="outlined-adornment-password" sx={{ color: 'red' }}>Contraseña </InputLabel>
                                          ) : (
                                            
                                          <InputLabel htmlFor="outlined-adornment-password">Contraseña </InputLabel>
                                        )
                                          
                                        }
                                        <OutlinedInput
                                          id="outlined-adornment-password"
                                          type={showPassword ? 'text' : 'password'}
                                          value={password.dato}
                                          onChange={(e) => validatePassword_empresa(e.target.value)}
                                          color={password.color}
                                          focused={password.fucosed}
                                          InputProps={{
                                            disableTabs: true,
                                          }}
                                          endAdornment={
                                            <InputAdornment position="end">
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                tabIndex="-1" // Omitir tabulación en el icono
                                                edge="end"
                                              >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                              </IconButton>
                                            </InputAdornment>
                                          }
                                          label="Contraseña"
                                          error={password.error}
                                          />
                                          {password.error ? (
                                            <FormHelperText sx={{ color: 'red' }}>{password.message}</FormHelperText>
                                            
                                            ) : (
                                              
                                              <FormHelperText sx={{ color: 'green' }}>{password.message}</FormHelperText>
                                            )

                                          }
                                      </FormControl>  
                                  </Grid>
                                  
                                  <Grid item xs={12} md={6}>
                                    <Autocomplete
                                      // fullWidth
                                      // sx={styleCampos}
                                      id="select_rol" 
                                      options={listroles}
                                      onChange={(e, newValue) => {
                                          
                                        setSelecRoles({
                                          pk_rol: newValue ? newValue.pk_rol : null,
                                          desc_rol: newValue ? newValue.desc_rol : null,
                                        });
                                      }}
                                      getOptionLabel={(option) => option.desc_rol}
                                      renderInput={(params) => <TextField {...params} label="Seleccionar Privilegio" variant="outlined" />}
                                      
                                    />
                                      
                                  </Grid>
                                  <Grid item xs={12} md={12}>
                                    <Stack sx={{ width: '100%', mt:3 }} spacing={2}>
                                      <Alert severity="warning"><strong>NOTA: EL USUARIO CREADO PARA INICIAR SESIÓN DEBE CAMBIAR LA CONTRASEÑA</strong> </Alert>
                                    </Stack>
                                      
                                  </Grid>
                                
                                  
                              </Grid>
                          </center>   
                      <Box 
                          sx={{mt:2,float:'right'}}
                          >
                          <Button variant="contained" id='btn_next' color="warning" sx={{mr:2}} onClick={() => beforeformstep()} >
                              Regresar
                          </Button>
                          
                          <Button type="submit" variant="contained" color="success"sx={{mr:2}} disabled={diseabledNextContrasena}>
                            Registrar
                          </Button> 
                      </Box>    
                  </Box>
              </Box>

              
              

          </Box>


        </Box>


      </Box>
    </>
  )
}

export default BodyRegisterAdmin
