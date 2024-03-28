import React from 'react'

import { Box,TextField,Button,Typography, Grid } from "@mui/material";

function BodyDetailsVotacion({cedula,nombre_apellido,sexo,cargo,direccion_general,ubicacion_fisica,estado_ubicacion,voto,onClose,onClosePrincipal}) {
  return (
    <>
      
      <Box component='div' sx={{minHeight:'auto',maxHeight:'500px',overflow:'auto'}}>
          <Box component='div'>
            <Typography variant="p" color="error">Datos Personales:</Typography>
          </Box>

          {/* DATOS PERSONALES */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField 
                fullWidth
                id="cedula"
                label="Cedula"
                type='text'
                defaultValue={cedula}
                InputProps={{
                    readOnly: true,
                }}
                color="primary" 
                focused
                variant="filled"
                        
                />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField 
                fullWidth
                id="nombreapellido"
                label="Nombre y Apellido"
                type='text'
                defaultValue={nombre_apellido}
                InputProps={{
                    readOnly: true,
                }}
                color="primary" 
                focused
                variant="filled"
                        
                />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField 
                fullWidth
                id="sexo"
                label="Sexo"
                type='text'
                defaultValue={sexo}
                InputProps={{
                    readOnly: true,
                }}
                color="primary" 
                focused
                variant="filled"
                        
                />
          </Grid>
          
        </Grid>
            
        <br />
        {/* DATOS COMO TRABAJADOR */}
        
        <Box component='div'>
          <Typography variant="p" color="error">Datos informativos:</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth
              id="cargotrabajador"
              label="Tipo de cargo"
              multiline
              minRows={3}
              maxRows={5}
              defaultValue={cargo}
              InputProps={{
                readOnly: true,
              }}
              color="primary" 
              focused
              variant="filled"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth
              id="direcciongeneral"
              label="Dirección General"
              multiline
              minRows={3}
              maxRows={10}
              defaultValue={direccion_general}
              InputProps={{
                readOnly: true,
              }}
              color="primary" 
              focused
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth
              id="ubicacionfisica"
              label="Ubicacion Fisica"
              multiline
              minRows={3}
              maxRows={10}
              defaultValue={ubicacion_fisica}
              InputProps={{
                readOnly: true,
              }}
              color="primary" 
              focused
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth
              id="estadoubicacion"
              label="Estado"
              type='text'
              defaultValue={estado_ubicacion}
              InputProps={{
                readOnly: true,
              }}
              color="primary" 
              focused
              variant="filled"
            />
          </Grid>
         
        </Grid>
        <br />
        {/* ASISTIO AL VOTO */}
        <Box component='div'>
          <Typography variant="p" color="error">Participación del Trabajador:</Typography>
        </Box>
        <Grid container spacing={2}>
          {voto === 1 || voto =='1' ? (
            <Grid item xs={12} md={12}>
             <TextField 
              fullWidth
              id="vototrabajador"
              label="Votación"
              type='text'
              defaultValue='El usuario voto éxitosamente'
              InputProps={{
                readOnly: true,
              }}
              color="success" 
              focused
              variant="filled"
            />
          </Grid>
           
          ):(
            <Grid item xs={12} md={12}>
             <TextField 
              fullWidth
              id="vototrabajador"
              label="Votación"
              type='text'
              defaultValue='El usuario no ha votado'
              InputProps={{
                readOnly: true,
              }}
              color="error" 
              focused
              variant="filled"
            />
          </Grid>
          )} 
        </Grid>
      </Box>
    </>
  )
}

export default BodyDetailsVotacion
