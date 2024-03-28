import React from 'react'
// services
import {servidor} from '../../../Services/server.jsx';
// import herramientas
import { useEffect, useState } from "react";
import { AxiosGet } from '../../../Helpers/FetchAxios/FetchAxios.jsx';
// componente de estadistica de barra
import BodyCharBard from '../component/BodyCharBard'

function BodyChartBardNoVoto() {

  const [totalAsistentesNoVotaron,setTotalAsistentesNoVotaron] = useState([])

  const Total_AsistentesporEstado = () => {
    const url = `${servidor}AsistentesVotacion/AsistenteNoVotoPorEstado/Table`;
    AxiosGet(url,setTotalAsistentesNoVotaron)
    
  }
  useEffect(() => {
    Total_AsistentesporEstado()
  },[])

  const Estados=totalAsistentesNoVotaron.map((item) => item.nombre_estado)
  const total=totalAsistentesNoVotaron.map((item) => item.cantidad_asistentes)

  return (
    <>
      <BodyCharBard
        titiledashboard="Total Trabajadores del IVSS No Participaron Por Estado "
        subtitledata="Cantidad Trabajadores no participantes"
        labeldata={Estados}
        datas={total} 
        indexAxis="x"
      />
    </>
  )
}

export default BodyChartBardNoVoto
