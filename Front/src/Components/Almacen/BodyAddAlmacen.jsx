import {Box,TextField,Button,Autocomplete, Grid, FormControl, Select, InputLabel, MenuItem, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import {AxiosPost,AxiosGet} from '../../Helpers/FetchAxios/FetchAxios.jsx'
import '../../assets/Css/EstructuraForm.css'
const styleCampos ={
  width:'100%'
}

function BodyAddAlmacen({onClose,tableData}) {

    const [listalmacenes, setListAlmacenes] = useState([]);
    const [listPisos, setListPisos] = useState([]);
    const [listEstatus, setListEstatus] = useState([]);
    const [listPasillos, setListPasillos] = useState([]);

    const [selectalmacen, setSelectAlmacen] = useState([]);
    const [selectPisoAlmacen, setSelectPisoAlmacen] = useState([]);
    const [selectPasilloAlmacen, setSelectPasilloAlmacen] = useState([]);
    const [selectEstatusAlmacen, setSelectEstatusAlmacen] = useState([]);
    const [observacionAlmacen, setObservacionAlmacen] = useState([]);

    const [inputAlmacen, setInputAlmacen] = useState([]);
    const [inputPiso, setInputPiso] = useState([]);
    const [inputPasillo, setInputPasillo] = useState([]);


    const List_Almacenes=  () => {
        const url = "http://localhost/farmacia_Alto_Costo/app/almacen/almacen/table";
        AxiosGet(url,setListAlmacenes)
    };
    const List_PisosAlmacen=  () => {
        const url = "http://localhost/farmacia_Alto_Costo/App/almacen/Pisos/table";
        AxiosGet(url,setListPisos)
    };
    const List_PasilloAlmacen=  () => {
        const url = "http://localhost/farmacia_Alto_Costo/App/almacen/Pasillos/table";
        AxiosGet(url,setListPasillos)
    };
    const List_Estatus=  () => {
        const url = "http://localhost/farmacia_Alto_Costo/app/almacen/estatus/table";
        AxiosGet(url,setListEstatus)
    };
    
    useEffect(() => {
        List_Almacenes();
    }, []);
    useEffect(() => {
        List_PisosAlmacen();
    }, []);
    useEffect(() => {
        List_PasilloAlmacen();
    }, []);
    useEffect(() => {
        List_Estatus();
    }, []);
   

    // ---------------------------------------------------
    // -------------------eventos vaciar campos------------------------------------------------
    const vaciarTipoAlmacen = document.getElementById('select_tipo_almacen')
    const vaciarPisoAlmacen = document.getElementById('select_piso_almacen')
    const vaciarPasilloAlmacen = document.getElementById('select_pasillo_almacen')
    const vaciarEstatusAlmacen = document.getElementById('select_estatus_almacen')

    const vaciar_autocompletes = () =>{
        // campos a vaciar 
        vaciarTipoAlmacen.value = null
        vaciarPisoAlmacen.value = null
        vaciarPasilloAlmacen.value = null
        vaciarEstatusAlmacen.value = null

        // Disparar el evento de cambio en el campo Autocomplete
        const event = new Event('change', { bubbles: true });
        vaciarTipoAlmacen.dispatchEvent(event);
        vaciarPisoAlmacen.dispatchEvent(event);
        vaciarPasilloAlmacen.dispatchEvent(event);
        vaciarEstatusAlmacen.dispatchEvent(event);

        // vaciar los hook de estados
        setSelectAlmacen([])
        setSelectPisoAlmacen([])
        setSelectPasilloAlmacen([])
        setSelectEstatusAlmacen([])
        setObservacionAlmacen([])
    }
    // --------------------------------
    // -----------ADD MEDICAMENTOS-------
    // -------------
  
    const addAlmacen = async () =>{

        let tipoalmacen = null
        let pisoalmacen = null
        let pasilloalmacen = null
        // tipo de almacen
        if (selectalmacen.length === 0 || selectalmacen == null) {
            tipoalmacen = inputAlmacen
        }else{
            tipoalmacen = selectalmacen
        }
        // piso almacen
        if (selectPisoAlmacen.length === 0 || selectPisoAlmacen == null) {
            pisoalmacen = inputPiso
        }else{
            pisoalmacen = selectPisoAlmacen
        }
        // pasillo almacen
        if (selectPasilloAlmacen.length === 0 || selectPasilloAlmacen== null) {
            pasilloalmacen = inputPasillo
        }else{
            pasilloalmacen = selectPasilloAlmacen
        }
        
        const objalmacen = {
            tipoalmacen:tipoalmacen,
            pisoalmacen:pisoalmacen,
            pasilloalmacen:pasilloalmacen,
            observacion:observacionAlmacen,
            estatusalmacen:selectEstatusAlmacen.pk_estatus,

        }
        console.log(objalmacen)
        const url = 'http://localhost/farmacia_Alto_Costo/app/almacen/almacen/Insert'
        AxiosPost(url,objalmacen,`Almacen: ${objalmacen.tipoalmacen}`,tableData)
        tableData()
        vaciar_autocompletes()
    }



    const HandleSubmit = (e) => {
        e.preventDefault()
        addAlmacen()
        onClose()
        tableData()
      }
  return (
    <>


        <Box component="form" onSubmit={HandleSubmit} sx={{width:'100%'}}>
        
        <Grid container spacing={2} sx={{py:1}}>
            <Grid item xs={12} md={6}>
                <Autocomplete sx={styleCampos}
                        id="select_tipo_almacen" 
                        options={listalmacenes}
                        onChange={(e, newValue) => {
                            
                            setSelectAlmacen({
                                pk_almacen : newValue ? newValue.PK_ALMACEN : null,
                                tipo_almacen: newValue ? newValue.TIPO_ALMACEN : null,
                            });
                        }}
                        onInputChange={(e, newInputValue) => {
                            // Almacenar el valor de la entrada del usuario
                            setSelectAlmacen([]);
                            setInputAlmacen(newInputValue);
                        }}
                        getOptionLabel={(option) => option.TIPO_ALMACEN}
                        renderInput={(params) => <TextField {...params} label="Ingresar Almacen" variant="outlined" />}
                        freeSolo
                />
            </Grid>
            <Grid item xs={12} md={6}>
                    <Autocomplete
                        sx={styleCampos}
                        id="select_piso_almacen" 
                        options={listPisos}
                        onChange={(e, newValue) => {
                            
                            setSelectPisoAlmacen(newValue.PISO);
                        }}
                        onInputChange={(e, newInputValue) => {
                            // Almacenar el valor de la entrada del usuario
                            setSelectPisoAlmacen([]);
                            setInputPiso(newInputValue);
                        }}
                        getOptionLabel={(option) => option.PISO}
                        renderInput={(params) => <TextField {...params} label="Ingresar Piso " variant="outlined" />}
                        freeSolo
                    />
            </Grid>
          
            <Grid item xs={12} md={6}>
                    <Autocomplete
                        sx={styleCampos}
                        id="select_pasillo_almacen" 
                        options={listPasillos}
                        onChange={(e, newValue) => {
                            
                            setSelectPasilloAlmacen(newValue.PASILLO);
                        }}
                        onInputChange={(e, newInputValue) => {
                            // Almacenar el valor de la entrada del usuario
                            setSelectPasilloAlmacen([]);
                            setInputPasillo(newInputValue);
                        }}
                        getOptionLabel={(option) => option.PASILLO}
                        renderInput={(params) => <TextField {...params} label="Ingresar Pasillo " variant="outlined" />}
                        freeSolo
                    />
            </Grid>
            <Grid item xs={12} md={6}>
                    <Autocomplete
                        sx={styleCampos}
                        id="select_estatus_almacen" 
                        options={listEstatus}
                        onChange={(e, newValue) => {
                            
                            setSelectEstatusAlmacen({
                                pk_estatus:newValue.PK_ESTATUS,
                                estatusalmacen:newValue.ESTATUS
                            });
                        }}
                        getOptionLabel={(option) => option.ESTATUS}
                        renderInput={(params) => <TextField {...params} label="Seleccionar su Estatus " variant="outlined" />}
                        
                    />
            </Grid>
            <Grid item xs={12} >
                <TextField sx={styleCampos}
                    id="observacion_almacen"
                    label="Observación"
                    multiline
                    minRows={5}
                    maxRows={10}
                    value={observacionAlmacen}
                    onChange={(e) => setObservacionAlmacen(e.target.value)}
                />
            </Grid>
            
          
        </Grid> 
          
        <Box 
            sx={{mt:2,float:'right'}}
          >
          <Button type="submit" variant="contained" color="success" sx={{mr:2}}>
            Registrar
          </Button>
          <Button variant="contained" color="error" onClick={onClose}>
            Cancelar
          </Button>
        </Box>
   
        
        </Box>  
    
    </>
  )
}

export default BodyAddAlmacen