import React from 'react'

import { useContext, useEffect, useState } from "react";
import { AxiosPost, AxiosGet, AxiosConfitVotar } from "../../Helpers/FetchAxios/FetchAxios.jsx";
import { Box, Button, TextField, InputLabel, Grid, FormControl,Alert,
        IconButton ,InputAdornment , FormHelperText, OutlinedInput, Typography
      } from '@mui/material'


import Sidebar from '../../Routers/Sidebar';
// services
import {servidor} from '../../Services/server.jsx';

function BodyVotacion({user}) {
  const [messagevoto, setMessageVoto] = useState('');
  const [voto, setVoto] = useState('');
  const [diseabledVoto,setDiseabledVoto] = useState(true) // desabilitar btn registrar establecimiento

  
  
  
    const Activ_desact_voto = () =>{
      let voto = user.voto

      if(voto === 1 || voto == '1'){
        setDiseabledVoto(true);
        setMessageVoto('Uste ya ha Participado exitosamente')
        setVoto('success')
      }else{
        setDiseabledVoto(false);
        setMessageVoto('Por favor, recuerde Participar')
        setVoto('warning')
      }
    }
    useEffect(() => {
      Activ_desact_voto();
    }, []);
    
    
    
  const Votar_Asistente = () =>{
      
    const dataasistentevoto ={
      cedula :  user.usuario
    }
    
    const url =`${servidor}Votacion/Votar/UpdateVotar`
    AxiosConfitVotar(url,dataasistentevoto,`Usuario: ${user.nombre_apellido} `,'Participó','Ha participado satisfatoriamente',Activ_desact_voto)

  }
  
  const HandleSubmitVotar = (e) =>{
    e.preventDefault()
    Votar_Asistente()
    
    // onClose()
    
  }

  // letra inicial del usuario logeado
  const InicialUser = user.nombre.substr(0 ,1)

  return (
    <>
      <Sidebar
        inicialusario={InicialUser}
        usuario={user.nombre_apellido}
      />
      
      <Box component='div'>
        <Box component='div' sx={{width:'70%',margin:'auto'}}>
          
          <Box component='form' onSubmit={HandleSubmitVotar}
              sx={{width:'100%',p:'1rem',
                  boxShadow:'8px 8px  6px #ccc, -2px -2px 10px #ccc',borderRadius:'6px',background:'#ffffffd9'}}
            >
              <Box component='center' sx={{textAlign:'center',py:'1rem'}}>
                <Typography variant="h5" color="error">Datos del Usuario:</Typography>
              </Box>
              <Box component='div' sx={{width:'100%',my:'0.5rem'}}>
                <Alert severity={voto} sx={{display:'flex',alignItems:'center',justifyContent:'center'}} >
                  <strong>{messagevoto}</strong>!
                </Alert>
              </Box>
              <Grid container spacing={2}>

                  <Grid item xs={6} md={6}>
                      <TextField 
                          fullWidth
                          id="usuario"
                          label="Usuario"
                          type='text'
                          defaultValue={user.nombre_apellido}
                          InputProps={{
                              readOnly: true,
                          }}
                          color="primary" 
                          focused
                          variant="filled"
                          
                      />
                  </Grid>
                  <Grid item xs={6} md={6}>
                      <TextField 
                          fullWidth
                          id="sexo_usuario"
                          label="Sexo"
                          type='text'
                          defaultValue={user.sexo}
                          InputProps={{
                              readOnly: true,
                          }}
                          color="primary" 
                          focused
                          variant="filled"
                      />
                  </Grid>
                  <Grid item xs={6} md={6}>
                      
                      <TextField 
                        fullWidth
                        id="direccion_usuario"
                        label="Dirección"
                        multiline
                        minRows={5}
                        maxRows={10}
                        defaultValue={user.nombre_direccion}
                        InputProps={{
                          readOnly: true,
                      }}
                      color="primary" 
                      focused
                      variant="filled"
                      />
                  </Grid>
                  <Grid item xs={6} md={6}>
                      
                      <TextField 
                        fullWidth
                        id="ubicacion_usuario"
                        label="Ubicación"
                        multiline
                        minRows={5}
                        maxRows={10}
                        defaultValue={user.nombre_ubicacion}
                        InputProps={{
                          readOnly: true,
                      }}
                      color="primary" 
                      focused
                      variant="filled"
                      />
                  </Grid>
                  
              </Grid>
              <Box component='div' sx={{width:'100%',my:'0.5rem'}}>
                  <Button sx={{width:'100%',color:'#fff',backgroundImage: 'linear-gradient(to right top, #de4343, #e04a4a, #e25151, #e35858, #e55f5f)'}} 
                      type="submit" variant="contained" color="primary"
                      disabled={diseabledVoto}>
                    Votar
                  </Button>
              </Box>
              
              
          </Box>
        </Box>
      </Box>

    </>
  )
}

export default BodyVotacion
