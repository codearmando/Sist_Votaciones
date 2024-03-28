import React, { useEffect, useState } from 'react'

// services
import {servidor} from '../../../Services/server.jsx';
import {AxiosPost,AxiosGet} from '../../../Helpers/FetchAxios/FetchAxios.jsx'

import { Box} from '@mui/material'
import CardComponent from '../component/CardComponent.jsx';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';

function BodyCards() {

  const [countTotalAsistentes,setCountTotalAsistentes] = useState([])
  const [countTotalDireccionPrincipal,setCountTotalDireccionPrincipal] = useState([])
  const [countTotalUbicacionFisica,setCountTotalUbicacionFisica] = useState([])

  const Count_TotalAsistentes = () => {
    const url = `${servidor}AsistentesVotacion/AsistenteCantidadTotal/Table`;
    AxiosGet(url,setCountTotalAsistentes)
    
  }
  const Count_TotalDireccionPrincipal = () => {
    const url = `${servidor}AsistentesVotacion/CantidadDireccionPrincipal/Table`;
    AxiosGet(url,setCountTotalDireccionPrincipal)
    
  }
  const Count_TotalUbicacionFisica = () => {
    const url = `${servidor}AsistentesVotacion/CantidadUbicacionFisica/Table`;
    AxiosGet(url,setCountTotalUbicacionFisica)
    
  }
  useEffect(() => {
    Count_TotalAsistentes()
    Count_TotalDireccionPrincipal()
    Count_TotalUbicacionFisica()
  },[])

  

  return (
    <>
      <Box component='div'
        sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap'}}>
        <CardComponent
            titlecard='Total trabajadores IVSS'
            subtitle='cantidad:'
            count={countTotalAsistentes.map((item) => item.total_asistentes_ivss)}    
            icon={PeopleOutlinedIcon}
            porcentaje={0}
            />
        <CardComponent
            titlecard='Direcciones principales'
            subtitle='cantidad:'
            count={countTotalDireccionPrincipal.map((item) => item.total_direcciones_ivss)}    
            icon={LocationCityOutlinedIcon}
            porcentaje={0}
            />
        <CardComponent
            titlecard='Sedes Administrativas'
            subtitle='cantidad:'
            count={countTotalUbicacionFisica.map((item) => item.total_ubicacion_ivss)}    
            icon={BusinessOutlinedIcon}
            porcentaje={0}
        />
       
      </Box>
    </>
  )
}

export default BodyCards
