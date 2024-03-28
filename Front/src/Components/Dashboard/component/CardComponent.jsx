import React from 'react'


import { Box, Button, TextField, InputLabel, Grid, FormControl,Alert,
  IconButton ,InputAdornment , FormHelperText, OutlinedInput, Typography
} from '@mui/material'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function CardComponent({titlecard,subtitle,count,icon: IconComponent,porcentaje}) {

  let colorProcentaje;

  if(porcentaje >=0  && porcentaje <=35){
    colorProcentaje='red'
  } 
  else if(porcentaje >35 && porcentaje <=75){
    colorProcentaje='orange'

  }
  else if(porcentaje >75 && porcentaje <=100){
    colorProcentaje='#00b500'

  }else{
    colorProcentaje='gray'
  }

  return (
    <>
        <Box component='div' 
          sx={{width:'300px',height:'150px',my:'0.5rem',borderRadius:'7px',boxShadow:'0 8px  25px rgba(0,0,0,0.15)'}}
          >
          <Box component='center' sx={{textAlign:'center'}}>
            <Typography variant="h6" color='error'>{titlecard}</Typography>
          </Box>
          <Box component='div' 
            sx={{p:'1rem',display:'flex',alignItems:'center',justifyContent:'space-between'}} >
            <Box component='div'>

              <Box component='div'>
                <Typography variant="h6" color="primary">{subtitle}</Typography>
              </Box>
              <Box component='div'>
                <Typography variant="p" sx={{color:'#1dba6cef'}}><strong>{count}</strong></Typography>
              </Box>
            </Box>
            {porcentaje === undefined ||porcentaje === null ||porcentaje === '' ||porcentaje === 0 ? (

              <Box component='div'>
                <Box component='div' sx={{display:'block'}}>

                  {IconComponent && <IconComponent fontSize="large" sx={{color:'red'}} />}
                </Box>
                
              </Box>
            ) : (

              <Box component='div'>
                <Box component='div' sx={{display:'block'}}>

                  {IconComponent && <IconComponent fontSize="large" sx={{color:colorProcentaje}} />}
                </Box>
                
                <Box component='div' sx={{display:'block'}}>
                  <Typography variant="p" color={colorProcentaje}>{porcentaje}%</Typography>
                </Box>
                
                
              </Box>
            )
            }
          </Box>
      </Box>
    </>
  )
}

export default CardComponent

