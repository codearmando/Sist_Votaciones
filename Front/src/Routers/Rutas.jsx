import { Routes,Route, useNavigate,} from 'react-router-dom'


import { Container } from '@mui/material';
import '../assets/Css/Fondo.css'
// ? -------------------------- CONTEXT--------------------------
import { useContext, useEffect } from 'react'
import { Contextdatos } from '../Context/ContextAutenticacion'
import { PageCambioPassword, PageCorteVoto, PageCortesIvss, PageDashboardAdmin, PageDashboardVotos, PageDataVotaciones, PageListCorteVoto, PageLogingAdmin, PageRegisterAdministradores, PageVotar, PageVotoTrabajadores } from '../Page/Index';
import { ProtectedRouters } from './ProtectedRouters';
import BodyCambioContrasena from '../Components/FormLogin/BodyCambioContrasena';


function Rutas() {



  const {userLogin, decryptData} = useContext(Contextdatos) //? CONTEXT HOOK userLogin
  const navigate = useNavigate();

  const storedUser = decryptData(sessionStorage.getItem('user'));
  // const storedUser = JSON.parse(sessionStorage.getItem('user'));
  // console.log('storedUser',storedUser)
  const logear = () =>{

    if(!storedUser?.usuario || !storedUser?.pkrol){

      // console.log('no hay data')
      // navigate('/Portarweb');
      return false;
    }
    else if(storedUser?.pkrol === 1){ // rol administrador
      navigate('/PageDashvotos');
    }else if(storedUser?.pkrol === 2){ // rol analista
      navigate('/VotoTrabajadores');
      
    }
    else if(storedUser?.pkrol === 3){ //rol director
      navigate('/PageAdminDir');

    }
    else{

      console.log('si hay data para rutas: ')
      // console.log('userLogin: ',storedUser)
      // navigate('/Home');

    }
    
  }

  useEffect(() =>{
    logear()
  },[userLogin])

  


  return (
    
    <>
      
      {/* barra lateral   */}
      
      {/* <Sidebar />  */}
          
      <Container maxWidth='sl' sx={{mt:'1rem'}}>
        
        <Routes>
          <Route index element={<PageLogingAdmin/>} /> {/* ruta principal al logearse */}
          {/* RUTAS COMUNES PARA TODOS LOS ROLES*/}
          <Route path='/LoginAdmin' element={<PageLogingAdmin />} />
          {/* <Route path='/Login' element={<PageLoging />} /> */}


          {/* ruta para acceder solo si tiene usuario */}
          {/* <Route element={<ProtectedRouters user={userLogin} rol={[3]} />}>
            <Route path='/Votar' element={<PageVotar user={userLogin} />} />
          </Route> */}
          {/* ROL ADMINISTRADOR */}
          <Route element={<ProtectedRouters user={storedUser} rol={[1]}/>}>
            {/* <Route path='/Votar' element={<PageVotar user={storedUser} />} /> */}
            <Route path='/PageAdmin' element={<PageDashboardAdmin user={storedUser} />} />
            <Route path='/PageDashvotos' element={<PageDashboardVotos user={storedUser} />} />
            <Route path='/VotoTrabajador' element={<PageVotoTrabajadores user={storedUser} />} />
            <Route path='/PageVotacionesData' element={<PageDataVotaciones user={storedUser} />} />
            <Route path='/PageResgisteradmin' element={<PageRegisterAdministradores user={storedUser} />} />
            <Route path='/PageCorteVoto' element={<PageCorteVoto user={storedUser} />} />
            <Route path='/ListadoCortes' element={<PageListCorteVoto user={storedUser} />} />
            <Route path='/CortesIvss' element={<PageCortesIvss user={storedUser} />} />
            
          </Route>
          {/* ROL ANALISTA */}
          <Route element={<ProtectedRouters user={storedUser} rol={[2]}/>}>
            {/* <Route path='/Votar' element={<PageVotar user={storedUser} />} /> */}
            <Route path='/VotoTrabajadores' element={<PageVotoTrabajadores user={storedUser} />} />

          </Route>
          {/* ROL DIRECTOR */}
          <Route element={<ProtectedRouters user={storedUser} rol={[3]}/>}>
            {/* <Route path='/Votar' element={<PageVotar user={storedUser} />} /> */}
            <Route path='/PageAdminDir' element={<PageDashboardAdmin user={storedUser} />} />
            <Route path='/PageDashvotosDir' element={<PageDashboardVotos user={storedUser} />} />
          </Route>

          {/* RUTA CAMBIAR CONTRASEÑA */}
          <Route path='/CambioPassword' element={<PageCambioPassword />} />
          

          {/* cuando la ruta no exite*/}
          {/* <Route path='*' element={<Error404/> } /> */}
        </Routes>
        
      </Container>

    </>
    
  )
}

export default Rutas