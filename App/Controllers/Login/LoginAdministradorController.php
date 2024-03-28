<?php

// require_once __DIR__ . '/../Models/Inv_Medicamento/TipoAlmacenModel.php';
require_once __DIR__ . '/../../Models/Login/LoginAdministradorModel.php';

Class LoginAdministradorController {

    private $usuariosadministradores;

    public function __construct($conexion)
    {
        $this->usuariosadministradores = new LoginAdministradorModel($conexion);
    }

    // public function Table (){
    //     $datausuariosadministradores =  $this->usuariosadministradores->getSelect('*');
    //     echo json_encode($datausuariosadministradores);
    // }

    public function Table (){
        $Post_Data = file_get_contents('php://input');
        $body = json_decode($Post_Data,true);

        $pass_hash= hash('sha256',$body['password']);
        
        // $dataLogin =  $this->LoginSessionModel->getSelectIDParam('*','correo_principal','contrasena', 'empresa@gmail.com',123);
        $datausuariosadministradores =  $this->usuariosadministradores->getSelectIDParam('*','cedula','contrasena', $body['user'],$pass_hash);
        echo json_encode($datausuariosadministradores);
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


        $InsertAdministradores = $this->usuariosadministradores->PdoPostgreFunction('"public".insert_empresa_usuario_p_fi', $array_data, $out);

        // if($InsertAdministradores){
        //     echo 'el procedimiento se ejecuta correctamente';
            
        // }else{
        //     echo 'error para ejecutar el procedimiento';
           
        // }

        echo json_encode($out);
     
    }
    
}