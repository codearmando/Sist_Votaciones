<?php

// require_once __DIR__ . '/../Models/Inv_Medicamento/TipoAlmacenModel.php';
require_once __DIR__ . '/../../Models/Login/CambioContrasenaModel.php';

Class CambioContrasenaController {

    private $CambioContrasena;

    public function __construct($conexion)
    {
        $this->CambioContrasena = new CambioContrasenaModel($conexion);
    }

    public function Table (){
        $Post_Data = file_get_contents('php://input');
        $body = json_decode($Post_Data,true);

        $dataCambioContrasena=  $this->CambioContrasena->getSelectID('*','email',$body['emailuser']);
        echo json_encode($dataCambioContrasena);
    }

    public function UpdateContrasenaUsuario ()
    {
        $Post_Data = file_get_contents('php://input');
        $body = json_decode($Post_Data, true);

        $out = 0;
        
        $array_data = [
            
            // 'i_tipo_solicitud' => $body['tiposolicitud'] ,
            'u_cedula_usuario' => $body['ci_asistente'],
            'u_contrasena_nueva' => hash('sha256',$body['contrasenauser'])

        ];
        
        $UpdateContrasenauser = $this->CambioContrasena->PdoPostgreFunction('"public".update_contrasena_usuario_admin', $array_data, $out);

        echo json_encode($out);

    }
    public function UpdateContrasenaUsuarioAdministradores ()
    {
        $Post_Data = file_get_contents('php://input');
        $body = json_decode($Post_Data, true);

        $out = 0;
        
        $array_data = [
            
            // 'i_tipo_solicitud' => $body['tiposolicitud'] ,
            'u_email_usuario' => $body['emailuser'],
            'u_contrasena_nueva' => hash('sha256',$body['contrasenauser'])

        ];
        
        $UpdateContrasenauser = $this->CambioContrasena->PdoPostgreFunction('"sacs".cambio_contrasena_usuario', $array_data, $out);

        echo json_encode($out);

    }
}