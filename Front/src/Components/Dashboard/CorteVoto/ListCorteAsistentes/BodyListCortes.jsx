import React from 'react'
import { useEffect, useState } from "react";
import { AxiosGet } from '../../../../Helpers/FetchAxios/FetchAxios.jsx';
// assets
// archivos importados
import '../../../../assets/Css/NavLink.css'
// material ui 
import { Box,Button,Dialog,ListItemText,ListItemButton,List,
    Divider,AppBar,Toolbar,IconButton,Typography, Slide, Grid  } from '@mui/material';

// MATERIAL ICON
import CloseIcon from '@mui/icons-material/Close';

// services
import {servidor} from '../../../../Services/server.jsx';
import BodyCharDoughnut from '../../component/BodyCharDoughnut.jsx';
import { HighlightOffTwoToneIcon } from '@mui/icons-material/HighlightOffTwoTone';


function BodyListCortes() {

    const [cortesRealizados,setCortesRealizados] = useState([])

    const [openClouseListCorte, setOpenClouseListCorte] = React.useState(false);

    const OpenClouseFullModalListCorte = () => {
      setOpenClouseListCorte(!openClouseListCorte);
    };
  

    const Cortes_Realizados = () => {
        const url = `${servidor}CorteVotacion/Cortevotacion/Table`;
        AxiosGet(url,setCortesRealizados)
        
    }
    useEffect(() => {
        Cortes_Realizados()
    },[])

    // dahsboar dona
    let v_cortesrealizados = cortesRealizados.map((item) => item.id_corte)
   
  return (
    <>

        {/* <React.Fragment> */}
            <Button variant="contained" color='error' onClick={OpenClouseFullModalListCorte}>
                Cortes Generados
            </Button>
            <Dialog
                    fullScreen
                    open={openClouseListCorte}
                    onClose={OpenClouseFullModalListCorte}
                    // TransitionComponent={Transition}
                >
                <AppBar sx={{ position: 'relative' }} id='AppBar'>
                    <Toolbar>
                        <IconButton
                        edge="start"
                        color="inherit"
                        onClick={OpenClouseFullModalListCorte}
                        aria-label="close"
                        >
                        <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Cortes de Participaciones Registradas
                        </Typography>
                        <Button autoFocus color="inherit" onClick={OpenClouseFullModalListCorte}>
                            Guardar
                        </Button>
                    </Toolbar>
                </AppBar>
                {/*  LISTADO DE CORTES REALIZADOS */}
                <Box component='div' sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    {cortesRealizados.map((item) => (
                            <Box component='div' key={item.id_corte}
                                sx={{m:'0.5rem'}}>
                                <BodyCharDoughnut
                                    titiledashboard={'Corte Nro '+ item.id_corte }
                                    subtitledata="Cantidad"
                                    labeldata={['CANTIDAD DE PARICIPANTES']}
                                    datas={[item.cantidad]} 
                                />
                                
                                <Divider />
                                
                            </Box>
                    ))}
                </Box>
            </Dialog>
        {/* </React.Fragment> */}
    </>
  )
}

export default BodyListCortes
