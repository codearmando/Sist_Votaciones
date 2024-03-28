import React, { useEffect, useState } from 'react'

// services
import {servidor} from '../../../Services/server.jsx';
import {AxiosPost,AxiosGet} from '../../../Helpers/FetchAxios/FetchAxios.jsx'

import { Box} from '@mui/material'
import CardComponent from '../component/CardComponent.jsx';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';

function BodyCardsVotos() {

    const [countTotalAsistentes,setCountTotalAsistentes] = useState([])
    const [countTotalAsistentesSiVotaron,setCountTotalAsistentesSiVotaron] = useState([])
    const [countTotalAsistentesNoVotaron,setCountTotalAsistentesNoVotaron] = useState([])
    

    const Count_TotalAsistentes = () => {
        const url = `${servidor}AsistentesVotacion/AsistenteCantidadTotal/Table`;
        AxiosGet(url,setCountTotalAsistentes)
        
    }
    const Count_TotalAsistente_NoVotaron = () => {
        const url = `${servidor}AsistentesVotacion/CantidadAsistenteSiVotaron/Table`;
        AxiosGet(url,setCountTotalAsistentesSiVotaron)
        
    }
    const Count_TotalAsistentes_SiVotaron = () => {
        const url = `${servidor}AsistentesVotacion/CantidadAsistenteNoVotaron/Table`;
        AxiosGet(url,setCountTotalAsistentesNoVotaron)
        
    }
    useEffect(() => {
        Count_TotalAsistentes()
        Count_TotalAsistentes_SiVotaron()
        Count_TotalAsistente_NoVotaron()
    },[])

    // obtenr porcentaje de los votos 
    const TotalAsistentes = countTotalAsistentes.map((item) => item.total_asistentes_ivss)
    let porcentaje_sivoto = countTotalAsistentesSiVotaron.map((item) => item.cantidad) * 100 / TotalAsistentes
    let porcentaje_novoto = countTotalAsistentesNoVotaron.map((item) => item.cantidad) * 100 / TotalAsistentes



  return (
    <>
    
       <Box component='div'
            sx={{width:'100%',display:'flex',alignItems:'flex-start',justifyContent:'space-around',flexWrap:'wrap'}}>
            <CardComponent
                titlecard='Usuarios Si Participaron del IVSS'
                subtitle='cantidad:'
                count={countTotalAsistentesSiVotaron.map((item) => item.cantidad)}    
                icon={FingerprintOutlinedIcon}
                porcentaje={porcentaje_sivoto.toFixed(3)}
            />
            <CardComponent
                titlecard='Usuarios No Participaron del IVSS'
                subtitle='cantidad:'
                count={countTotalAsistentesNoVotaron.map((item) => item.cantidad)}    
                icon={FingerprintOutlinedIcon}
                porcentaje={porcentaje_novoto.toFixed(3)}
            />
            
       
        </Box>
    </>
  )
}

export default BodyCardsVotos
