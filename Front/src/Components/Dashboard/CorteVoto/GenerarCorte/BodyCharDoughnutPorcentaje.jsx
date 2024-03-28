import React from 'react'
// services
import {servidor} from '../../../../Services/server.jsx';
// import herramientas
import { useEffect, useState } from "react";
import { AxiosGet } from '../../../../Helpers/FetchAxios/FetchAxios.jsx';
// componente de estadistica de barra
import BodyCharDoughnut from '../../component/BodyCharDoughnut.jsx';
import { Box} from '@mui/material'

function BodyCharDoughnutPorcentaje() {

    const [countTotalAsistentes,setCountTotalAsistentes] = useState([])
    const [countTotalAsistentesSiVotaron,setCountTotalAsistentesSiVotaron] = useState([])
    const [countTotalAsistentesNoVotaron,setCountTotalAsistentesNoVotaron] = useState([])
    const [PorcentajeVotantes,setPorcentajeVotantes] = useState()


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
    const votacion = ['SI VOTARON', 'NO VOTARON']
    const TotalAsistentes = countTotalAsistentes.map((item) => item.total_asistentes_ivss)
    let porcentaje_sivoto = countTotalAsistentesSiVotaron.map((item) => item.cantidad) * 100 / TotalAsistentes
    let porcentaje_novoto = countTotalAsistentesNoVotaron.map((item) => item.cantidad) * 100 / TotalAsistentes

    let Porcentaje_SN = [].concat(porcentaje_sivoto.toFixed(3),porcentaje_novoto.toFixed(3))

  return (
      <>
      <Box component='div' sx={{width:'100%'}}>
        <BodyCharDoughnut
          titiledashboard="Porcentaje Estadisticos de Participaciones Nacional "
          subtitledata="Cantidad"
          labeldata={votacion}
          datas={Porcentaje_SN} 
        />
      </Box>
    </>
  )
}

export default BodyCharDoughnutPorcentaje
