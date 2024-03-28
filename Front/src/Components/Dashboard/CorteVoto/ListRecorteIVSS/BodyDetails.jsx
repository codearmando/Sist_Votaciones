import React from 'react'

import { Box,TextField,Button,Typography, Grid } from "@mui/material";

function BodyDetails({nrocorte, cantidadasistieron, cantidadnoasistieron, ubicacion_fisica, dirgeneral,
                     totalempleados, porcentajeasistieron, porcentajenoasistieron,fechacorte, nombre_estado}) {
  return (
    <>
         <Box component='div' sx={{minHeight:'auto',maxHeight:'500px',overflow:'auto'}}>
          <Box component='div'>
            <Typography variant="p" color="error">Datos Informativos:</Typography>
          </Box>

          {/* DATOS PERSONALES */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField 
                fullWidth
                id="nrocorte"
                label="Nro de corte"
                type='text'
                defaultValue={`Corte Nro : ${nrocorte}`}
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
                id="nombreestado"
                label="Nombre Estado"
                type='text'
                defaultValue={nombre_estado}
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
                id="cantidadasistieron"
                label="Cantidad asistieron"
                type='text'
                defaultValue={`Asistieron ${cantidadasistieron}`}
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
                id="porcentajeasistieron"
                label="Porcentaje"
                type='text'
                defaultValue={`Asistieron : ${porcentajeasistieron}`}
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
                id="cantidadnoasistieron"
                label="cantidad no asistieron"
                type='text'
                defaultValue={`No Asistieron : ${cantidadnoasistieron}`}
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
                id="porcentajenoasistieron"
                label="Porcentaje"
                type='text'
                defaultValue={`No Asistieron : ${porcentajenoasistieron}`}
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
          <Typography variant="p" color="error">Más información:</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth
              id="dirgeneral"
              label="Dirección General"
              multiline
              minRows={3}
              maxRows={5}
              defaultValue={dirgeneral}
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
              id="totalempleados"
              label="Total de Empleados"
              type='text'
              defaultValue={totalempleados}
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
              id="fechacorte"
              label="Fecha del Corte"
              type='text'
              defaultValue={fechacorte}
              InputProps={{
                readOnly: true,
              }}
              color="primary" 
              focused
              variant="filled"
            />
          </Grid>
         
        </Grid>

        
      </Box>
    </>
  )
}

export default BodyDetails
