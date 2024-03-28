import React from 'react'
// componente de grafica de dona 
import BodyCharDoughnutPorcentaje from './BodyCharDoughnutPorcentaje.jsx'

// material ui 
import { Box } from '@mui/material';
// sidebar
import Sidebar from '../../../../Routers/Sidebar.jsx';
import Button from '@mui/material/Button'

import { AxiosPost, AxiosGet, AxiosConfitVotar } from "../../../../Helpers/FetchAxios/FetchAxios.jsx";
// services
import {servidor} from '../../../../Services/server.jsx';
import BodyCorte from './BodyCorte.jsx';


function ViewCorteVoto({user}) {

    

    // letra inicial del usuario logeado
    const InicialUser = user.nombre.substr(0 ,1)

  return (
    <>
        <Sidebar
            inicialusario={InicialUser}
            usuario={user.nombre_apellido}
            pkrol={user.pkrol}
        />

        <Box component='center' sx={{width:'100%',height:'auto',mb:2}}>
          <BodyCorte />
        </Box>
    </>
  )
}

export default ViewCorteVoto
