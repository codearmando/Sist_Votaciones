import { Box,TextField,Button,Autocomplete,Typography, Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import {AxiosPut,AxiosGet} from '../../Helpers/FetchAxios/FetchAxios.jsx'

const styleCampos ={
    width:'100%'
}

function BodyUpdate({onClose,tableData, pkalmacen,tipoalmacen, piso, pasillo, observacion, estatus}) {

    const [selectAlmacen, setSelectAlmacen] = useState([]);
    const [selectPiso, setSelectPiso] = useState([]);
    const [selectPasillo, setSelectPasillo] = useState([]);
    const [selectEstatus, setSelectEstatus] = useState([]);
    const [observacionAlmacen, setObservacionAlmacen] = useState([]);
    const [inputAlmacen, setInputAlmacen] = useState([]);
    // listado de objetos
    const [listalmacenes, setListAlmacenes] = useState([]);
    const [listipoalmacenes, setListipoAlmacenes] = useState([]);
    const [listPisos, setListPisos] = useState([]);
    const [listPasillos, setListPasillos] = useState([]);
    const [listestatus, setListEstatus] = useState([]);


    const List_Almacenes=  () => {
        const url = "http://localhost/farmacia_Alto_Costo/app/almacen/almacen/table";
        AxiosGet(url,setListAlmacenes)
    };
    const List_TipoAlmacenes=  () => {
        const url = "http://localhost/farmacia_Alto_Costo/App/almacen/tipoalmacen/table";
        AxiosGet(url,setListipoAlmacenes)
    };
    const List_PisosAlmacen=  () => {
        const url = "http://localhost/farmacia_Alto_Costo/App/almacen/Pisos/table";
        AxiosGet(url,setListPisos)
    };
    const List_PasilloAlmacen=  () => {
        const url = "http://localhost/farmacia_Alto_Costo/App/almacen/Pasillos/table";
        AxiosGet(url,setListPasillos)
    };
    const List_EstatusAlmacen=  () => {
        const url = "http://localhost/farmacia_Alto_Costo/app/almacen/estatus/table";
        AxiosGet(url,setListEstatus)
    };
    useEffect(() => {
        List_Almacenes();
    }, []);
    useEffect(() => {
        List_TipoAlmacenes();
    }, []);
    useEffect(() => {
        List_PisosAlmacen();
    }, []);
    useEffect(() => {
        List_PasilloAlmacen();
    }, []);
    useEffect(() => {
        List_EstatusAlmacen();
    }, []);

    // ----------------------------
    //----- VALORES POR DEFECTO EN AUTOCOMPLETE------------
    const valuetipoalmacen= listalmacenes.find((element) => 
        element.TIPO_ALMACEN === tipoalmacen 

    );
    const valuepiso= listPisos.find((element) => 
        element.PISO === piso

    );
    const valuepasillo= listPasillos.find((element) => 
        element.PASILLO === pasillo 

    );
    const valuestatus = listestatus.find((element) => 
        element.ESTATUS === estatus 

    );
    
    //-----------------------------
    // -----------UPDATE ALAMCEN ----------------- 
    let v_observacion = null
    if (observacionAlmacen.length === 0  ) {
        v_observacion = observacion
    }else{
        v_observacion = observacionAlmacen
    }
    const updatealmacen = () =>{
        let v_almacen = null
        let v_piso = null
        let v_pasillo = null
        let v_estatus = null

        // if (selectAlmacen.length === 0  || inputAlmacen.length === 0 ) {
        //     v_almacen =  tipoalmacen
        // }else{
        //     v_almacen =  inputAlmacen
        // }
        if (selectPiso.length === 0  ) {
            v_piso = piso
        }else{
            v_piso = selectPiso
        }
        if (selectPasillo.length === 0  ) {
            v_pasillo = pasillo
        }else{
            v_pasillo = selectPasillo
        }
        if (selectEstatus.length === 0 ) {
            v_estatus = valuestatus
        }else{
            v_estatus = selectEstatus
        }

        const objAlmacenUpdate = {
            pkalmacen : pkalmacen,
            almacen :inputAlmacen,
            piso :v_piso,
            pasillo :v_pasillo,
            observacion :v_observacion,
            estatus :v_estatus.PK_ESTATUS,
        }

        console.log('objalmacen',objAlmacenUpdate)

        const url = 'http://localhost/farmacia_Alto_Costo/App/almacen/almacen/update'
        AxiosPut(url,objAlmacenUpdate,`Almacén ${tipoalmacen} Modificado a ${inputAlmacen}`,`Almacén con los mismo detalles`,tableData)
        tableData()

    }

    const HandleSubmitUpdate = (e) =>{
        e.preventDefault()
        updatealmacen()
        onClose()
        tableData()
    }

    
    

  return (
    <>

    {/* NOTA : Autocomplete- hay que asegurarse que el valor que por defecto se le pasa al autocomplete sea un objeto 
        de lo contrario dara undefined */}
    
        <Box sx={{width: 'auto'}} component='form' onSubmit={HandleSubmitUpdate}>
            <Box>
                <Typography variant="p" color="primary">Modificar Datos</Typography>
                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={7}>
                        
                        <Autocomplete sx={styleCampos}
                            id="select_tipo_almacen" 
                            options={listipoalmacenes}
                            value={valuetipoalmacen || null}
                            onInputChange={(e, newInputValue) => {
                                // Almacenar el valor de la entrada del usuario
                                setSelectAlmacen([]);
                                setInputAlmacen(newInputValue);
                            }}
                            getOptionLabel={(option) => option.TIPO_ALMACEN}
                            renderInput={(params) => <TextField {...params} label="Seleccionar Almacen" variant="outlined" />}
                            freeSolo
                        />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Autocomplete sx={styleCampos}
                            id="select_tipo_piso" 
                            options={listPisos}
                            type="number"
                            value={valuepiso || null}
                            onChange={(e, newValue) => {
                                
                                setSelectPiso(newValue.PISO);
                            }}
                            getOptionLabel={(option) => option.PISO}
                            renderInput={(params) => <TextField {...params} label="Seleccionar piso" variant="outlined" />}
                            freeSolo
                        />
                        
                    </Grid>
                    <Grid item xs={12} md={7}>
                        
                        <Autocomplete sx={styleCampos}
                            id="select_tipo_pasillo" 
                            options={listPasillos}
                            value={valuepasillo || null}
                            onChange={(e, newValue) => {
                                
                                setSelectPasillo(newValue.PASILLO);
                            }}
                            getOptionLabel={(option) => option.PASILLO}
                            renderInput={(params) => <TextField {...params} label="Seleccionar pasillo" variant="outlined" />}
                            freeSolo
                        />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Autocomplete sx={styleCampos}
                            id="select_tipo_estatus" 
                            options={listestatus}
                            value={valuestatus || null}
                            onChange={(e, newValue) => {
                                
                                setSelectEstatus({
                                    PK_ESTATUS : newValue.PK_ESTATUS,
                                    ESTATUS: newValue.ESTATUS,
                                });
                            }}
                            getOptionLabel={(option) => option.ESTATUS}
                            renderInput={(params) => <TextField {...params} label="Seleccionar Estatus" variant="outlined" />}
                            freeSolo
                        />
                        
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField sx={styleCampos}
                            id="observacion"
                            label="Observacion"
                            placeholder='NOTA: la observación es si algunos medicamentos a registrar no estarán en su almacenamiento correspondiente por "x" motivo. De lo contrario ingresar : NINGUNA POR AHORA'
                            multiline
                            minRows={5}
                            maxRows={10}
                            value={v_observacion}
                            onChange={(e) => setObservacionAlmacen(e.target.value)}
                        />
                    </Grid>

                </Grid>
            </Box>
            <br />
            <hr />
            <Typography variant="p" color="primary">Modificar dato:</Typography>
            <br />
            <br />
            <Grid container spacing={2}>
              
              
            </Grid>

            <Box 
                    sx={{mt:2,float:'right'}}
                >
                <Button type="submit" variant="contained" color="success" sx={{mr:2}}>
                    Modificar
                </Button>
                <Button variant="contained" color="error" onClick={onClose}>
                    Cancelar
                </Button>
            </Box>

            {/* <p>seleccion:  {selecttipmedicamento}</p> */}
        </Box>
        
        
    </>
  )
}

export default BodyUpdate