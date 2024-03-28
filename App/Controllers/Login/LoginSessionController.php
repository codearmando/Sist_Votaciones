<?php

// require_once __DIR__ . '/../Models/Inv_Medicamento/TipoAlmacenModel.php';
require_once __DIR__ . '/../../Models/Login/LoginSessionModel.php';

Class LoginSessionController {

    private $usuariosession;

    public function __construct($conexion)
    {
        $this->usuariosession = new LoginSessionModel($conexion);
    }

    // public function Table (){
    //     $datausuariosession =  $this->usuariosession->getSelect('*');
    //     echo json_encode($datausuariosession);
    // }
    public function Table (){
        $Post_Data = file_get_contents('php://input');
        $body = json_decode($Post_Data,true);

        $pass_hash= hash('sha256',$body['password']);
        // $arreglo = [
        //     "cedula" => "123456789",
        //     "nombre" => "Juan",
        // ];

        // if($body['pkrol'] != null || $body['pkrol'] != ''){
            
            $datausuariosession =  $this->usuariosession->getSelectIDParameters('*','cedula','contrasena','pk_rol', $body['user'],$pass_hash,$body['pkrol']);
            echo json_encode($datausuariosession);
        // }else{
        //     $roldefault='3';
        //     // $dataLogin =  $this->LoginSessionModel->getSelectIDParam('*','correo_principal','contrasena', 'empresa@gmail.com',123);
        //     $datausuariosession =  $this->usuariosession->getSelectIDParameters('*','cedula','contrasena','pk_rol', $body['user'],$pass_hash,$roldefault);
        //     echo json_encode($datausuariosession);
        // }
        
    }
    public function InsertUsuario ()
    {
        $Post_Data = file_get_contents('php://input');
        $body = json_decode($Post_Data, true);

        $out = 0;

        $array_data = [
            'i_cedula_usuario'  => $body['ci_asistente'], 
            'i_contrasena_usuario' => hash('sha256',$body['contrasena']) ,
            'i_rol_usuario'  => $body['pkrol'], 
        ];


        $InsertUsuario = $this->usuariosession->PdoPostgreFunction('"public".insert_usuario_administrativo', $array_data, $out);

        // if($InsertUsuario){
        //     echo 'el procedimiento se ejecuta correctamente';
            
        // }else{
        //     echo 'error para ejecutar el procedimiento';
           
        // }

        echo json_encode($out);
     
    }
    
}