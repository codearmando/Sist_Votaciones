import React from 'react'
import BodyChartBardSiVoto from './BodyChartBardSiVoto'
import BodyChartBardNoVoto from './BodyChartBardNoVoto';
import BodyCardsVotos from './BodyCardsVotos';
// import BodyCharDoughnutPorcentaje from '../CorteVoto/BodyCharDoughnutPorcentaje';



import { Box, Button, TextField, InputLabel, Grid, FormControl, Autocomplete,
  IconButton ,InputAdornment , FormHelperText, OutlinedInput, Typography
} from '@mui/material'

// sidebar 
import Sidebar from '../../../Routers/Sidebar';

function ViewDashVotosNacional({user}) {

  // letra inicial del usuario logeado
  const InicialUser = user.nombre.substr(0 ,1)


  return (
    <>
      <Sidebar
        inicialusario={InicialUser}
        usuario={user.nombre_apellido}
        pkrol={user.pkrol}
      />

      

      <Box component='div'>
        

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
          <BodyCardsVotos />
          </Grid>
          {/* <Grid item xs={12} sm={12} md={3} sx={{bgcolor:'orange'}}>
            <BodyCharDoughnutPorcentaje />
          </Grid> */}
        </Grid>
      </Box>

        <br />
        <br />
      <Box component='div'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <BodyChartBardSiVoto /> 
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <BodyChartBardNoVoto /> 
          </Grid>
        </Grid>
      </Box>
        
    </>
  )
}

export default ViewDashVotosNacional
