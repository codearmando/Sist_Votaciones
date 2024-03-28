import React from 'react'

// services
import {servidor} from '../../../Services/server.jsx';


// import herramientas
import { useEffect, useState } from "react";
import { AxiosGet } from '../../../Helpers/FetchAxios/FetchAxios.jsx';

import { Box, Button, TextField, InputLabel, Grid, FormControl, Autocomplete,
  IconButton ,InputAdornment , FormHelperText, OutlinedInput, Typography
} from '@mui/material'
import BodyCharBard from '../component/BodyCharBard.jsx';

// import chartjs
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BodyBardTotal() {

  const [totalAsistenteporEstado,setTotalAsistenteporEstado] = useState([])
  const [totalAsistentes, setTotalAsistentes] = useState()

  const Total_AsistentesporEstado = () => {
    const url = `${servidor}AsistentesVotacion/AsistenteTotalPorEstado/Table`;
    AxiosGet(url,setTotalAsistenteporEstado)
    
  }
  useEffect(() => {
    Total_AsistentesporEstado()
  },[])

  const Estados=totalAsistenteporEstado.map((item) => item.nombre_estado)
  const total=totalAsistenteporEstado.map((item) => item.cantidad_asistentes)


  return (
    <>

      <BodyCharBard
        titiledashboard="Total Trabajadores del IVSS Por Estado "
        subtitledata="Cantidad Trabajadores"
        labeldata={Estados}
        datas={total} 
        indexAxis="x"
      />

      {/* <button onClick={consola}>concola</button> */}
      {/* <Box sx={{width:'100%'}}>
            <Bar data={data} options={options} />
        </Box> */}
    </>
  )
}

export default BodyBardTotal
