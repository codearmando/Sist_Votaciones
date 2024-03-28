import React from "react";
import BodyCorteIVSS from "./BodyCorteIVSS";


// material ui 
import {Box,Button,TextField,Select,InputLabel,MenuItem,Alert,Stack,Collapse,Grid,Typography, 
  FormControl, Tooltip, IconButton, Autocomplete, Divider} from "@mui/material";


// sidebar
import Sidebar from '../../../../Routers/Sidebar.jsx';

function ViewCorteIVSS({ user }) {


  // letra inicial del usuario logeado
  const InicialUser = user.nombre.substr(0 ,1)

  return (
    <>
      <Sidebar
        inicialusario={InicialUser}
        usuario={user.nombre_apellido}
        pkrol={user.pkrol}
      />

      <Box component="div">
        <BodyCorteIVSS />
      </Box>
    </>
  );
}

export default ViewCorteIVSS;
