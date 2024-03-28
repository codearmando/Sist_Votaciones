import { Navigate,Outlet, NavLink } from 'react-router-dom'

import { useRef, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, IconButton, Toolbar, Button, AppBar, Tooltip, Avatar, Menu, MenuItem, Grid } from '@mui/material'

// icon material ui 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// import Sidebar from '../Routers/Sidebar'
import img from '../assets/Img/Exportar_img_all'
// css
import '../assets/Css/NavLink.css'
import ViewLoging from "../Components/FormLogin/ViewLoging"
// import ViewHome from "../Components/Home/ViewHome"
import BodyInicioAdmin from './../Components/FormLogin/BodyInicioAdmin';
import ViewVotacion from './../Components/Votacion/ViewVotacion';
import ViewDashNacionalTotal from '../Components/Dashboard/TotalAsistenteNacional/ViewDashNacionalTotal';
import ViewDashVotosNacional from '../Components/Dashboard/VotosAsistenesNacional/ViewDashVotosNacional';
import ViewDataVotacion from '../Components/DataVotaciones/ViewDataVotacion';
import ViewVotoTrabajadores from '../Components/VotoTrabajadores/ViewVotoTrabajadores';
import BodyRegisterAdmin from '../Components/FormLogin/BodyRegisterAdmin';
import BodyCambioContrasena from '../Components/FormLogin/BodyCambioContrasena';
import ViewCorteVoto from '../Components/Dashboard/CorteVoto/GenerarCorte/ViewCorteVoto';
import ViewListCortes from '../Components/Dashboard/CorteVoto/ListCorteAsistentes/ViewListCortes';
import ViewCorteIVSS from '../Components/Dashboard/CorteVoto/ListRecorteIVSS/ViewCorteIVSS';



export const PageLogingAdmin = () =>{
    return <ViewLoging />
}
export const PageDashboardAdmin = ({user}) =>{
    return <ViewDashNacionalTotal user={user}/>
}
export const PageDashboardVotos = ({user}) =>{
    return <ViewDashVotosNacional user={user}/>
}
export const PageDataVotaciones = ({user}) =>{
    return <ViewDataVotacion user={user}/>
}
export const PageVotar = ({user}) =>{
    return <ViewVotacion user={user} />
}
export const PageVotoTrabajadores = ({user}) =>{
    return <ViewVotoTrabajadores user={user} />
}
export const PageRegisterAdministradores = ({user}) =>{
    return <BodyRegisterAdmin user={user} />
}
export const PageCorteVoto = ({user}) =>{
    return <ViewCorteVoto user={user} />
}
export const PageListCorteVoto = ({user}) =>{
    return <ViewListCortes user={user} />
}
export const PageCortesIvss = ({user}) =>{
    return <ViewCorteIVSS user={user} />
}
export const PageCambioPassword = () =>{
    return <BodyCambioContrasena />
}
// export const PageWebportal = () =>{
//     return <ViewWebPortal />
// }






