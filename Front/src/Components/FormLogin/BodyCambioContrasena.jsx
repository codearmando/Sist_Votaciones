import { useNavigate, Link} from 'react-router-dom'
import { Box, Button, TextField, Select,InputLabel, MenuItem, Alert, Stack, Collapse, Autocomplete, 
        Grid, Typography, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl ,
        IconButton, InputAdornment , FormHelperText, OutlinedInput} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AxiosGet,AxiosPost } from '../../Helpers/FetchAxios/FetchAxios'
import PadStartCiudadano from '../../Helpers/Ciudadano/PadStartCiudadano'
import axios from 'axios'
import '../../assets/Css/FormStep.css'
import Swal from 'sweetalert2'

import '../../assets/Css/Popup.css'
  // icon material 
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// services
import {servidor} from "../../Services/server.jsx"

// -----------toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { nextformstep,beforeformstep } from '../../assets/JS/FormStep'

import {expresionsRegulars,Email_Expression,Password_Expression,Rif_Expression,Texto_Expression,
    Tlf_First_Expression,Tlf_Second_Expression,Email_First_Expression,Email_Second_Expression,Text_number_Expressions,
    number_Expressions,MaxText_number_Expression,LimiteDe_Text_Number_Expression,Cedula_Expression} from '../../assets/JS/ExpresionRegulares.js'
// helpers

const styleCampos ={
    width:'100%',

}




function BodyCambioContrasena() {

    // redirigirme al login una vez cambiada la contraseña
    const navigate = useNavigate();

    const [cedulauser, setCedulaUser] = useState({ dato:null, error : false, message : '', color:null, fucosed: null});
    // HOOK DE USUARIO A
    const [cedulaAsistente,setCedulaAsistente] = useState({dato:null,error : false,message : '',color:null,fucosed: null});
    const [selectnacAsistente,setSelectNacAsistente] = useState('');
    const [asistente,setAsistente] = useState({});
    const [listdirecciones, setListDirecciones] = useState([]);
    const [selecdireccion, setSelecDireccion] = useState([]);
    // cambio contraseña
    const [pass1, setPass1] = useState({ dato:null, error : false, message : '', color:null, fucosed: null});
    const [pass2, setPass2] = useState({ dato:null, error : false, message : '', color:null, fucosed: null});

    const [diseabledBuscarCiudadano,setDiseabledBuscarCiudadano] = useState(true);
    const [diseabledConfirPass,setDiseabledConfirPass] = useState(true);
    const [openppoder, setOpenppoder] = useState(false);
    const [openppoder2, setOpenppoder2] = useState(false);
    //  ocultar y mostrar password
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword2, setShowPassword2] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };

    // -----------------------------------
    // --------------LISTADOS---------------------
    // -----------------------------------
    const List_Direccion=  () => {
        const url =`${servidor}Ciudadanos/ListDireccionAsistente/Table`;
        AxiosGet(url,setListDirecciones)
      };
      useEffect(() => {
        List_Direccion();
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
 
    const HandleSubmitCiudadano = (e) =>{
        e.preventDefault()
        datos_asistente()
    
    }

    const CambioContrasena = async () =>{

        const objcontrasena = {
            ci_asistente: asistente.nac_cedula,
            contrasenauser: pass1.dato,
        }

        if(pass1.dato === pass2.dato){
            // console.log('Cambio de Contraseña exito',objcontrasena)
            const url =`${servidor}Login/CambioContrasena/UpdateContrasenaUsuario`
            AxiosPost(url,objcontrasena,`Cambio Contraseña Exitoso`,`Registrado`,`Usted ${asistente.nombre_apellido} cambio su contraseña existosamente`,null)
            // setTimeout para redirigir después de dos segundos
            setTimeout(() => {
                navigate('/LoginAdmin');
            }, 1000);
            
        }else{
            Swal.fire(
                'Error!',
                `Las Contraseñas no coinciden` ,
                'error'
            )
        }
    }
    const handleSubmitvCambioContrasena = (e) =>{
        e.preventDefault()
        CambioContrasena()
    }


    // ---------------------------------
    // * ------------- VALIDATE CAMPO EXPRESIONES REGULARES  --------------------
    // ---------------------------------

    const validateCedula = (value) => {
        Cedula_Expression(value,setCedulaAsistente);    
    }
    const validate_Pass1 = (value) => {
        Password_Expression(value,setPass1)   
    } 
    const validate_Pass2 = (value) => {
        Password_Expression(value,setPass2)   
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


    // VALIDACION CAMPOS PASSWORDS
       // -----campos select para validar que no esten vacios estos campos
       
    
       useEffect(() =>{
         if(
            !expresionsRegulars.passwordRegex.test(pass1.dato) || pass1.dato === null || pass1.dato === undefined ||
            !expresionsRegulars.passwordRegex.test(pass2.dato) || pass2.dato === null || pass2.dato === undefined 
         
         
         ){
           setDiseabledConfirPass(true)
         }else{
           setDiseabledConfirPass(false)
         }
       },[pass1,pass2])


  return (
    <>

        
        <Box 
            sx={{mt:2,float:'left'}}
            > 
            <Link to='/LoginAdmin'>
                <Button variant="contained" color="error" >
                    Volver a login
                </Button>
            </Link>

        </Box>
        <Box component='div' sx={{width:'70%', margin:'auto', boxShadow:'2px 2px 6px 6px #ddd',borderRadius:'10px',p:'1rem'}}>
            <Box component='center' className='tit_popup'  sx={{width:'100%'}}>
                {/* <center> */}
                    <Typography variant="h6" sx={{color:'#fff',textAlign:'center'}}>Cambio de Contraseña</Typography>
                {/* </center> */}
            </Box>
            <Box className = 'Cont_form_step'>

                <Box className='slider_form'>
                    {/* slider 1 */}
                    <Box component='form' className='form_ciudadano' id='form_step' onSubmit={HandleSubmitCiudadano} >

                        {/*--------------------  */}
                        {/* Buscar ciudadano  */}
                        {/*--------------------  */}
                        <Box>
                            
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
                                      onChange={(e) => validateCedula(e.target.value)}
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
                                    <strong>Los Datos no son Correctos</strong> o <strong>No esta REGISTRADO . " POR FAVOR BERIFIQUE "</strong>!
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

                    
                    <Box component='form' className='form_ciudadano' id='form_step' onSubmit={handleSubmitvCambioContrasena}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}  md={5} sm={6}>
                                <FormControl sx={styleCampos} variant="outlined">
                                    {pass1.error ? (
                                        
                                        <InputLabel htmlFor="outlined-adornment-password" sx={{ color: 'red' }}>Nueva contraseña </InputLabel>
                                        ) : (
                                        
                                        <InputLabel htmlFor="outlined-adornment-password">Nueva contraseña </InputLabel>
                                    )
                                        
                                    }
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={pass1.dato}
                                        onChange={(e) => validate_Pass1(e.target.value)}
                                        color={pass1.color}
                                        focused={pass1.fucosed}
                                        // InputProps={{
                                        // disableTabs: true,
                                        // tabIndex: -1
                                        // }}
                                        // inputProps={{ tabIndex: -1 }} // Omitir tabulación
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
                                        label="Nueva Contraseña"
                                        error={pass1.error}
                                        />
                                        {pass1.error ? (
                                        <FormHelperText sx={{ color: 'red' }}>{pass1.message}</FormHelperText>
                                        
                                        ) : (
                                            
                                            <FormHelperText sx={{ color: 'green' }}>{pass1.message}</FormHelperText>
                                        )

                                        }
                                </FormControl>  
                            </Grid>
                            <Grid item xs={12} md={5} sm={6}>
                            <FormControl sx={styleCampos} variant="outlined">
                                    {pass2.error ? (
                                        
                                        <InputLabel htmlFor="outlined-adornment-password" sx={{ color: 'red' }}>Confirmar contraseña </InputLabel>
                                        ) : (
                                        
                                        <InputLabel htmlFor="outlined-adornment-password">Contraseña </InputLabel>
                                    )
                                        
                                    }
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword2 ? 'text' : 'password'}
                                        value={pass2.dato}
                                        onChange={(e) => validate_Pass2(e.target.value)}
                                        color={pass2.color}
                                        focused={pass2.fucosed}
                                        // InputProps={{
                                        // disableTabs: true,
                                        // tabIndex: -1
                                        // }}
                                        // inputProps={{ tabIndex: -1 }} // Omitir tabulación
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword2}
                                            onMouseDown={handleMouseDownPassword2}
                                            tabIndex="-1" // Omitir tabulación en el icono
                                            edge="end"
                                            >
                                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        label="Contraseña"
                                        error={pass2.error}
                                        />
                                        {pass2.error ? (
                                        <FormHelperText sx={{ color: 'red' }}>{pass2.message}</FormHelperText>
                                        
                                        ) : (
                                            
                                            <FormHelperText sx={{ color: 'green' }}>{pass2.message}</FormHelperText>
                                        )

                                        }
                                </FormControl>  
                                
                            </Grid>
                            <Grid item xs={12} md={2} sm={6}>    
                                <Button type="submit" variant="contained" color="success"sx={{mt:1}} tabIndex={-1}
                                    disabled={diseabledConfirPass}>
                                    Confirmar
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>

                </Box>

            </Box>

        </Box>

    </>
  )
}

export default BodyCambioContrasena