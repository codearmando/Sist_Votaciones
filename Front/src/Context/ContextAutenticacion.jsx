import { createContext, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
//lib encriptacion
import CryptoJS from 'crypto-js';
// import { Routes,Route, useNavigate,} from 'react-router-dom'

// servicio
import {servidor} from '../Services/server.jsx'

export const Contextdatos = createContext() //? creo el context 

export function ContextAutentication({children}) {  //? funcion context para todo el proyecto

    const [userLogin, setuserLogin] = useState([]);
    // const navigate = useNavigate();

    const secretKey = import.meta.env.VITE_KEY_CRYPTO
    // const secretKey = `7!Gj#zT$%W8b@Xs*3qK&LmY9hN6cFd^2`
    // const secretKey = `WHsngMQgzBKxwkq7jls8It3Kdsd2NmCv`
    // Función para cifrar los datos
    const encryptData = (data) => {
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
        return encryptedData;
    };
   
    const decryptData = (encryptedData) => {

        try {
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);//desencriptamos el objeto encriptado mediante la misma clave de encriptacio
            //con json.paser obteneos el formato original del objeto encriptado y la desencriptación sera en cedena de texto como indicamos
            //  con toString y se interpretara como un formato Utf8 (hace interprete al texto(string) )
            const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
            return decryptedData;
        } catch (error) {
            console.error('Error al desencriptar los datos:', error);
            return error;
        }
    };
    
    // LOGEAR USER
    const User_login = async(datauser)  => {

        const userAutenticacion = {
            user: datauser.user,
            password: datauser.pass,
            pkrol:datauser.rol
        };


        const url =`${servidor}Login/LoginSession/Table`;

        const resp = await axios.post(url, JSON.stringify(userAutenticacion));
        const resp_data = await resp.data;

        // console.log("resp_data context", resp_data);
        
        if (resp_data === false || resp_data.length === 0) {
            // console.log('CONTEXT: Usuario en la BD no existe')
            
            setuserLogin([])
            // return false
            return(
                Swal.fire(
                  'Lo Siento!',
                  `Usuario o Contraseña incorrecta. Por favor verifique o Registrese`,
                  'error'
                )
            )
        } else {
            
            setuserLogin({
                usuario: resp_data.cedula,
                nombre: resp_data.nombre1,
                apellido: resp_data.apellido1,
                nombre_apellido: `${resp_data.nombre1} ${resp_data.apellido1}`,
                sexo: resp_data.sexo,
                contrasena: resp_data.contrasena,
                pkrol: resp_data.pk_rol,
                tiporol: resp_data.desc_rol,
                nombre_ubicacion: resp_data.nombre_ubicacion,
                nombre_direccion: resp_data.nombre_direccion,
                voto: resp_data.voto,
            });
             // Almacena la información de usuario en sessionStorage al iniciar sesión
            const datauser = {
                usuario: resp_data.cedula,
                pkrol: resp_data.pk_rol,
                nombre: resp_data.nombre1,
                nombre_apellido: `${resp_data.nombre1} ${resp_data.apellido1}`,
                voto: resp_data.voto
            }
            const encriptarusuario = encryptData(datauser)
            sessionStorage.setItem('user', encriptarusuario);
            // sessionStorage.setItem('user', JSON.stringify(datauser));
            return(
                Swal.fire(
                  `Bienvenido! ${resp_data.nombre1} ${resp_data.apellido1}`,
                  `Inicio de Sesión Exitoso`,
                  'success'
                )
            )
            // console.log('hay usuario en mi context data', userLogin)
        }

    

    };

    // CERRAR SESION
    const Logout_sesison = () =>{
        // navigate('/LoginAdmin');
        setuserLogin([])
        sessionStorage.removeItem('user');
    }


    return (
        <>
            {/* pasar valores al contect creado */}
            <Contextdatos.Provider 
                    value={{
                        userLogin,//estado hook
                        User_login, // funcion iniciar sesion
                        Logout_sesison, // funcion cerrar sesion
                        decryptData // Pasar la función para desencriptar datos en el contexto
                    }}
                >

                {children}

            </Contextdatos.Provider>
        </>
    )
}

