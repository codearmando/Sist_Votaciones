// Import react and material ui 

import { useRef, useState, useContext } from 'react'
// hook context
import { Contextdatos } from "../Context/ContextAutenticacion.jsx";

import { NavLink } from 'react-router-dom'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, IconButton, Toolbar,
     AppBar, Tooltip, Avatar, Menu, MenuItem } from '@mui/material'

// icon material ui 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import MenuIcon from '@mui/icons-material/Menu';

// archivos importados assets
import '../assets/Css/NavLink.css'
import img from '../assets/Img/Exportar_img_all'


function Sidebar({inicialusario,usuario,pkrol}) {

    const {Logout_sesison} = useContext(Contextdatos) // CONTEXT FUNCION Logout_sesison cerrar sesion
    const clouse_Session =() => {
        Logout_sesison()
    }

    // ----------------------------------------------------------------
    // ----------------------------------------------------------------
    const [menuLogin, setmenuLogin] = useState(null);
    const openmenu = Boolean(menuLogin); //para convertir el evento en bolleano

    const SideBarRef = useRef(null); 

    const close_sidebar = () =>{
        SideBarRef.current.classList.remove('nav_active')
    }
    const open_sidebar = () =>{
        SideBarRef.current.classList.add('nav_active')
    }

    const openMenuLogin = (event) => {
        setmenuLogin(event.currentTarget);
    };
    const closeMenuLogin = () => {
        setmenuLogin(null);//desactivar el evento ocurrido
        // console.log(openmenu)
    };



  return (
    <>

                {/* <li><NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/'>Inicio</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/Ticket'>Ticket</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/Paciente'>Paciente</NavLink></li>
                <li><NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/InventarioMedicamentos'>Inventario</NavLink></li> */}
       
       <Box sx={{ flexGrow: 1, width:'100%' }}>
            <AppBar position="static" id='AppBar'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={open_sidebar}
                    >
                        <MenuIcon />
                    </IconButton>

                    {pkrol === 1 ? (
                        <Typography variant="h6"  sx={{ flexGrow: 1 }}>
                            <NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/PageDashvotos'>
                                Inicio
                            </NavLink>
                        </Typography>

                    ) : pkrol === 2 ? (
                        <Typography variant="h6"  sx={{ flexGrow: 1 }}>
                            <NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/VotoTrabajadores'>
                                Inicio
                            </NavLink>
                        </Typography>

                    ) : pkrol === 3 ? (
                        <Typography variant="h6"  sx={{ flexGrow: 1 }}>
                            <NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/PageAdminDir'>
                                Inicio
                            </NavLink>
                        </Typography>

                    ) : null}

                    <Tooltip title={usuario}>
                        <IconButton aria-label="" onClick={openMenuLogin}>
                            <Avatar sx={{ width: 35, height: 35 }}>{inicialusario}</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                            id="basic-menu"
                            anchorEl={menuLogin}//anchorEl: es un atributo de este componente Menu que hace referencia a quien active el menu para posicionarce donde ocurrio el evento
                            open={openmenu}
                            onClose={closeMenuLogin}
                        >
                        {/* <MenuItem>Perfil</MenuItem> */}
                        {/* <MenuItem>Modo Claro/Nocturno</MenuItem> */}
                        <MenuItem onClick={clouse_Session} sx={{color:'red'}}>Cerrar Sesion</MenuItem>
                        {/* <MenuItem onClick={clouse_Session}><NavLink className='clouseSession' to='/LoginAdmin'>Cerrar Sesion</NavLink></MenuItem> */}
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>

        <Box component='div' id='container_nav' >
            <Box component='nav' className='nav' ref={SideBarRef} sx={{height:'100vh',overflow:'auto'}}>
                <IconButton aria-label="close" color='error' id='btn_close' onClick={close_sidebar} >
                    <CloseSharpIcon sx={{ fontSize: 40 }} />
                </IconButton>
                <Box component='div' id='nav_logo'>
                    <img src={img.logo_ivss_blanco} width='30%' id='logoivss' alt="logo_ivss_blanco" />
                    <Typography id='tit_logo' variant="p" color="initial">Instituto Venezolano del Seguro Social</Typography>
                </Box>    
                
                {pkrol === 1 ? (

                    <Box component='div' id='cont_list'>
                            
                        <Accordion id='linkacordeon'>
                            <NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/PageDashvotos'>Inicio</NavLink>
                        </Accordion>
                        <Accordion id='linkacordeon'>
                            <NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/PageResgisteradmin'>Crear usuario administrativo</NavLink>
                        </Accordion>
                        
                        <Accordion id='acordeon'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography color='primary'>Gestion de Participantes</Typography>
                            </AccordionSummary>
                            {/* <AccordionDetails>
                                <NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/Votar'>Voto Administrativo</NavLink><br />
                            </AccordionDetails> */}
                            <AccordionDetails>
                                <NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/VotoTrabajador'>Registrar Participante</NavLink><br />
                            </AccordionDetails>
                            <AccordionDetails>
                                <NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/PageVotacionesData'>Información de Participantes</NavLink><br />
                            </AccordionDetails>
                            <AccordionDetails>
                                <NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/PageDashvotos'>Estadísticas de participación</NavLink><br />
                            </AccordionDetails>
                            <AccordionDetails>
                                <NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/PageAdmin'>Estadísticas Nacional IVSS</NavLink><br />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion id='acordeon'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography color='primary'>Corte de Participantes</Typography>
                            </AccordionSummary>
                            {/* <AccordionDetails>
                                <NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/Votar'>Voto Administrativo</NavLink><br />
                            </AccordionDetails> */}
                            <AccordionDetails>
                                <NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/PageCorteVoto'>Corte de participación</NavLink><br />
                            </AccordionDetails>
                            <AccordionDetails>
                                <NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/ListadoCortes'>Listados de Cortes</NavLink><br />
                            </AccordionDetails>
                            <AccordionDetails>
                                <NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/CortesIvss'>Generar Reporte IVSS</NavLink><br />
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                ) : pkrol === 2 ?  (
                    <Box component='div' id='cont_list'>
                            
                        <Accordion id='linkacordeon'>
                            <NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/VotoTrabajadores'>Registrar Participante</NavLink>
                        </Accordion>
                        
                    </Box>

                ) : pkrol === 3 ?(
                    
                    <Box component='div' id='cont_list'>
                            
                        <Accordion id='linkacordeon'>
                            <NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/PageAdminDir'>Inicio</NavLink>
                        </Accordion>
                        <Accordion id='linkacordeon'>
                            <NavLink className={({isActive}) => isActive ? 'activeLink' : 'noactiveLink'} to='/PageDashvotosDir'>Estadísticas de Participante</NavLink>
                        </Accordion>
                        
                    </Box>
                ) : null}
            </Box>
        </Box>

        

    </>
  )
}

export default Sidebar