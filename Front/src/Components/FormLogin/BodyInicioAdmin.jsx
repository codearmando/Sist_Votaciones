// ----react-hook-form
import React from 'react'
// ------------
import { useContext, useEffect, useState } from "react";
import { Box, Button, TextField, InputLabel, Grid, FormControl, Autocomplete,
        IconButton ,InputAdornment , FormHelperText, OutlinedInput, Typography
      } from '@mui/material'
import {AxiosPost,AxiosGet} from '../../Helpers/FetchAxios/FetchAxios.jsx'
  // icon material 
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// hook context
import { Contextdatos } from "../../Context/ContextAutenticacion.jsx";
// css
import  './FormLogin.css'
import '../../assets/Css/FormStep.css'
import { Link } from "react-router-dom";
// JS
import {expresionsRegulars,Password_Expression,Cedula_Expression} from '../../assets/JS/ExpresionRegulares.js'
// services
import {servidor} from '../../Services/server.jsx';
// img
import img from '../../assets/Img/Exportar_img_all.js'
const styleCampos = {
  width: "100%",
};

function BodyInicioAdmin() {

   // HOOK INICIO DE SESION 
   const [cedulasession,setcedulasessionSession] = useState({
    dato:null,
    error : false,
    message : '',
    color:null,
    fucosed: null
  })
   const [passSession,setPassSession] = useState({
    dato:null,
    error : false,
    message : '',
    color:null,
    fucosed: null
   })
   const [listroles, setListRoles] = useState([]);
   const [selecroles, setSelecRoles] = useState([]);
   const [diseabledSubmitSession,setDiseabledSubmitSession] = useState(true)

  //  ocultar y mostrar password
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const List_Roles=  () => {
    const url =`${servidor}Login/Roles/Table`;
    AxiosGet(url,setListRoles)
  };
  useEffect(() => {
    List_Roles();
  }, []);

  // -----------------------------------
  // -----------------------------------

  const {User_login} = useContext(Contextdatos) // CONTEXT FUNCION user_login

   // -------------------CONTEXT DE INICIO DE SESSION------------------
  // const [usuerLogin, setusuerLogin] = useState([]);

  const user_data_login = () =>{
    User_login({
      user: cedulasession.dato,
      pass: passSession.dato,
      rol: selecroles.pk_rol
      });
      
  }
  
  const HandleSubmitIniciarSession = (e) =>{
    e.preventDefault()
    user_data_login()

  }


  // ------------------------------------
  // *--------------VALIDATE CAMPO EXPRESIONES REGULARES ----------------------
  // ------------------------------------
  
  const validateEmail = (value) => {
    Cedula_Expression(value,setcedulasessionSession);
  }
  const validatePassword = (value) => {
    Password_Expression(value,setPassSession)
  }
  
  
  
  
  // ------------------------------------
  //* VALIDACION DE CAMPOS VACIOS INICIO DE SESIÓN
  // ------------------------------------
  let select_privilegio = document.getElementById('select_privilegio')
   useEffect(() =>{
    if(!expresionsRegulars.numberRegex.test(cedulasession.dato) ||cedulasession.length == 0 || cedulasession == '' || cedulasession == null || 
       !expresionsRegulars.passwordRegex.test(passSession.dato) || passSession.length == 0 || passSession == '' || passSession == null ||

       selecroles.length == 0 || selecroles == '' || selecroles == null || select_privilegio.value.length === 0|| select_privilegio.value.length === null 
      ){
      setDiseabledSubmitSession(true)
    }else{
      setDiseabledSubmitSession(false)
    }
  },[cedulasession,passSession,selecroles])

  return (
    <>
    
      <Box component='center' sx={{mt:'0.5rem',width:'100%',height:'100vh',p:'1rem'}}>

         <Box component='form' onSubmit={HandleSubmitIniciarSession}
               sx={{p:'1rem', position:'relative',maxHeight:'100%',width:'100%',
               boxShadow:'8px 8px  6px #ccc, -2px -2px 10px #ccc',borderRadius:'6px',background:'#ffffffd9' }}>
                
                <Box component='div' sx={{my:'1rem',textAlign:'center',}}>
                    <Typography variant="h5" color="error"><strong>Iniciar Sesión</strong></Typography>
                </Box>
              
                <Grid container spacing={2} sx={{width:'100%'}}>
          
                     
                      <Grid item xs={12} sm={12} md={6}>
                        <TextField
                          fullWidth
                          id="usuario_inicioisesion"
                          label="usuario"
                          type="text"
                          placeholder="correo@gmail.com"
                          value={cedulasession.dato}
                          onChange={(e) => validateEmail(e.target.value)}
                          error={cedulasession.error}
                          helperText ={cedulasession.message}
                          color={cedulasession.color}
                          focused={cedulasession.fucosed}
                          InputProps={{
                            disableTabs: true,
                            tabIndex: -1
                          }}
                          // inputProps={{ tabIndex: -1 }} // Omitir tabulación
                          // onChange={(e) => cedulasession(e.target.value.toUpperCase())}
                          // { ... register("correo")}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Autocomplete
                          // fullWidth
                            // sx={styleCampos}
                            id="select_privilegio" 
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
                      <Grid item xs={12} sm={12} md={12}>
                        <FormControl fullWidth variant="outlined">
                          {passSession.error ? (
                            
                            <InputLabel htmlFor="outlined-adornment-password" sx={{ color: 'red' }}>Contraseña </InputLabel>
                            ) : (
                              
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña </InputLabel>
                          )
                            
                          }
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={passSession.dato}
                            onChange={(e) => validatePassword(e.target.value)}
                            color={passSession.color}
                            focused={passSession.fucosed}
                            InputProps={{
                              disableTabs: true,
                              tabIndex: -1
                            }}
                            inputProps={{ tabIndex: -1 }} // Omitir tabulación
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                  tabIndex="-1" // Omitir tabulación
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Contraseña"
                            error={passSession.error}
                            />
                            {passSession.error ? (
                              <FormHelperText sx={{ color: 'red' }}>{passSession.message}</FormHelperText>
                              
                              ) : (
                                
                                <FormHelperText sx={{ color: 'green' }}>{passSession.message}</FormHelperText>
                              )

                            }
                        </FormControl>
                       
                      </Grid>
                     
                      
                </Grid>

                <Button type='submit' variant="text" className="btn_loging" 
                  sx={{width:'100%',color:'#fff',backgroundImage: 'linear-gradient(to right top, #de4343, #e04a4a, #e25151, #e35858, #e55f5f)',mt:'1rem',padding:'1rem'}} 
                  disabled={diseabledSubmitSession}
                  tabIndex={-1} // Omitir tabulación
                  >
                  Iniciar sesion
                </Button>
                
                {/* COMPONENTE CAMBIO DE CONTRASEÑA */}
                <Box component='div' sx={{mt:'0.5rem'}}>
                  <center>
                    <Link to='/CambioPassword' className="link_olvido_pass" >
                      <Box component='p' sx={{fontSize:16}}>¿Ha olvidado su Contraseña?</Box>
                    </Link>
                  </center>
                
                </Box>
         </Box>
         {/* <Box component='div'>
            <Box sx={{textAlign:'center'}}>
                <Typography variant="h3" color="error">Personal Administrativo</Typography>
              </Box>
            <Box>
              <img src={img.LoginAdmin} id='logingadmin' alt="LoginAdmin" />
            </Box>
         </Box> */}
      </Box>
    </>
  )
}

export default BodyInicioAdmin
