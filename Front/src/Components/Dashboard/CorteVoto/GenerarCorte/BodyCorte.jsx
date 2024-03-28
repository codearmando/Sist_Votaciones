import React from 'react'
// componente de grafica de dona 
import BodyCharDoughnutPorcentaje from './BodyCharDoughnutPorcentaje.jsx'

// material ui 
import { Box , Alert} from '@mui/material';
import Button from '@mui/material/Button'

import { AxiosPost, AxiosGet, AxiosConfitVotar } from "../../../../Helpers/FetchAxios/FetchAxios.jsx";
// services
import {servidor} from '../../../../Services/server.jsx';


function BodyCorte() {

    const CorteVotacionI = () =>{
        
        const cortevoto ={
            valorunico :  1
        }
        
        const url =`${servidor}CorteVotacion/Cortevotacion/CorteVotacion`
        AxiosConfitVotar(url,cortevoto,`¿Realizar corte de las votaciones?`,`Sé procesara correctamente su corte de votación`,`Ejecutar Corte`,`Corte procesado`,`Corte de votación ejecutado satisfatoriamente`,null)
    
        
    }
      
    const HandleSubmitCorteVotacion = (e) =>{
        e.preventDefault()
        CorteVotacionI()
        // onClose()
    }

  return (
    <>

        <Box component='center' sx={{width:'100%',height:'auto',mb:2}}>

            <Box component='center' sx={{width:'80%'}}>
                <Box component='div' sx={{width:'50%',height:'50%'}} >
                    <BodyCharDoughnutPorcentaje sx={{width:'100%'}} />
                </Box>
            </Box>
            <Box component='div' sx={{width:'40%', bgcolor:'red'}}>
                <Box component='form' onSubmit={HandleSubmitCorteVotacion}>
                    <Alert severity="info">
                        Una vez generado el corte dirigirse a <strong>LISTADOS DE CORTES</strong> para visualizar su registro e información
                    </Alert>
                    <Box component='div' sx={{width:'100%'}} >
                        <Button type="submit" variant="contained" color="secondary" fullWidth>
                            generar Corte de Participaciones
                        </Button>
                    </Box>
                </Box>
            </Box>

        </Box>
    </>
  )
}

export default BodyCorte
