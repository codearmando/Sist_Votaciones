import React from 'react'
import BodyCards from './BodyCards'
import BodyBardTotal from './BodyBardTotal'
// import BodyMensual from './bodyMensual'

// sidebar
import Sidebar from '../../../Routers/Sidebar';

function ViewDashNacionalTotal({user}) {
  // letra inicial del usuario logeado
  const InicialUser = user.nombre.substr(0 ,1)

  return (
    <>
      <Sidebar
        inicialusario={InicialUser}
        usuario={user.nombre_apellido}
        pkrol={user.pkrol}
      />
       
        <BodyCards />
        <BodyBardTotal />
    </>
  )
}

export default ViewDashNacionalTotal
