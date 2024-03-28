import React from 'react'

import { Box, Button, TextField, Select,InputLabel, MenuItem, Alert, Stack, Collapse, Autocomplete, 
  Grid, Typography, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl ,
  IconButton, InputAdornment , FormHelperText, OutlinedInput} from '@mui/material'

  // assets
import img from '../../assets/Img/Exportar_img_all'
import '../../assets/Css/TextGradientEffect.css'

import BodyInicioAdmin from './BodyInicioAdmin'

function BodyFormLogin() {

  const textgradienth4 ={
    backgroundImage: 'linear-gradient(to right, #ff0000, #007bffdb)', // Degradado de color
    WebkitBackgroundClip: 'text', // Establece el área del texto afectada por el fondo
    color: 'transparent', // Hace el texto transparente para mostrar el degradado de fondo
    animation: 'moverFondo 5s linear infinite', // 5 segundos de duración, movimiento lineal y se repite infinitamente
    // Otros estilos que desees agregar
    
  }
  const textgradienth2 ={
    backgroundImage: 'linear-gradient(to right, #ffcc00, #ff6699)', // Degradado de color
    WebkitBackgroundClip: 'text', // Establece el área del texto afectada por el fondo
    color: 'transparent', // Hace el texto transparente para mostrar el degradado de fondo
    animation: 'moverFondo 5s linear infinite', // 5 segundos de duración, movimiento lineal y se repite infinitamente
    // Otros estilos que desees agregar
    
  }
  
  return (
    <>
      <Box component='div' 
        sx={{width:'100%',position:'relative',height:'auto',display:'flex',alignItems:'center',justifyContent:'space-between',
        overflow:'hidden',pt:'2.5rem'}}>
        <Box component='center' sx={{width:'100%',height:'auto',position:'relative',top:'-6rem'}}>
          <Box component='div' sx={{maxWidth:'100%'}}>
            <img src={img.logo_red_ivss} style={{width:'20%'}} alt="" />
            <h4 style={textgradienth4}>Instituto Venezolano de los Seguros Sociales</h4>
            <h4 style={textgradienth2}>Sistema de Elecciones IVSS!</h4>
          </Box>
          <Box component='div' sx={{position:'relative',transform:'rotate(-45deg)'}}>
            <img src={img.hueya_voto_vnzla} style={{width:'25%'}} alt="" />
          </Box>
        </Box>
        <Box component='div' sx={{width:'100%'}}>

          <BodyInicioAdmin /> 
        </Box>
      </Box>
    </>
  )
}

export default BodyFormLogin
