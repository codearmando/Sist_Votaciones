<?php

// require_once __DIR__ . '/../Models/Inv_Medicamento/TipoAlmacenModel.php';
require_once __DIR__ . '/../../Models/Votacion/VotarModel.php';

Class VotarController {

    private $Votacion;

    public function __construct($conexion)
    {
        $this->Votacion = new VotarModel($conexion);
    }

    // public function Table (){
    //     $dataVotacion =  $this->Votacion->getSelect('*');
    //     echo json_encode($dataVotacion);
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
            
            $dataVotacion =  $this->Votacion->getSelectIDParameters('*','cedula','contrasena','pk_rol', $body['user'],$pass_hash,$body['pkrol']);
            echo json_encode($dataVotacion);
        // }else{
        //     $roldefault='3';
        //     // $dataLogin =  $this->LoginSessionModel->getSelectIDParam('*','correo_principal','contrasena', 'empresa@gmail.com',123);
        //     $dataVotacion =  $this->Votacion->getSelectIDParameters('*','cedula','contrasena','pk_rol', $body['user'],$pass_hash,$roldefault);
        //     echo json_encode($dataVotacion);
        // }
        
    }
    public function UpdateVotar ()
    {
        $Post_Data = file_get_contents('php://input');
        $body = json_decode($Post_Data, true);

        $out = 0;

        $array_data = [
            'u_cedula_asistente'  => $body['cedula'], 
        ];


        $InsertAsistentes = $this->Votacion->PdoPostgreFunction('"public".update_asistente_asistio', $array_data, $out);

        // if($InsertAsistentes){
        //     echo 'el procedimiento se ejecuta correctamente';
            
        // }else{
        //     echo 'error para ejecutar el procedimiento';
           
        // }

        echo json_encode($out);
     
    }
    public function CorteVotacion ()
    {
        $Post_Data = file_get_contents('php://input');
        $body = json_decode($Post_Data, true);

        $out = 0;

        $array_data = [
            'valor_unico'  => $body['valorunico'], 
        ];


        $InsertCorteVotacion = $this->Votacion->PdoPostgreFunction('"public".registrarcorte', $array_data, $out);

        // if($InsertCorteVotacion){
        //     echo 'el procedimiento se ejecuta correctamente';
            
        // }else{
        //     echo 'error para ejecutar el procedimiento';
           
        // }

        echo json_encode($out);
     
    }
    
}