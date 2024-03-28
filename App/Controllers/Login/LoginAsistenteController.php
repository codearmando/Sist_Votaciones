<?php

// require_once __DIR__ . '/../Models/Inv_Medicamento/TipoAlmacenModel.php';
require_once __DIR__ . '/../../Models/Login/LoginAsistenteModel.php';

Class LoginAsistenteController {

    private $usuarioasistente;

    public function __construct($conexion)
    {
        $this->usuarioasistente = new LoginAsistenteModel($conexion);
    }

    // public function Table (){
    //     $datausuarioasistente =  $this->usuarioasistente->getSelect('*');
    //     echo json_encode($datausuarioasistente);
    // }
    public function Table (){
        $Post_Data = file_get_contents('php://input');
        $body = json_decode($Post_Data,true);

        $pass_hash= hash('sha256',$body['password']);
        
        // $dataLogin =  $this->LoginSessionModel->getSelectIDParam('*','correo_principal','contrasena', 'empresa@gmail.com',123);
        $datausuarioasistente =  $this->usuarioasistente->getSelectIDParam('*','cedula','contrasena', $body['user'],$pass_hash);
        echo json_encode($datausuarioasistente);
    }
    public function Insert ()
    {
        $Post_Data = file_get_contents('php://input');
        $body = json_decode($Post_Data, true);

        $out = 0;

        $array_data = [
            'i_rif_empresa'  => 'j-23php', 
            'i_nombre_empresa'  => 'empresa_PHP_POO', 
            'i_tip_empresa'  => 'MIXTA', 
            'i_contrasena_usuario' => hash('sha256',$body['contrasena']) ,
        ];


        $InsertAsistentes = $this->usuarioasistente->PdoPostgreFunction('"public".insert_empresa_usuario_p_fi', $array_data, $out);

        // if($InsertAsistentes){
        //     echo 'el procedimiento se ejecuta correctamente';
            
        // }else{
        //     echo 'error para ejecutar el procedimiento';
           
        // }

        echo json_encode($out);
     
    }
    
}