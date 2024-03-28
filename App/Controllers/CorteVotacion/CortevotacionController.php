<?php

// require_once __DIR__ . '/../Models/Inv_Medicamento/TipoAlmacenModel.php';
require_once __DIR__ . '/../../Models/CorteVotacion/CorteVotacionModel.php';

Class CortevotacionController {

    private $CorteElecciones;

    public function __construct($conexion)
    {
        $this->CorteElecciones = new CorteVotacionModel($conexion);
    }

    public function Table (){
        $dataCorteElecciones =  $this->CorteElecciones->getSelect('*');
        echo json_encode($dataCorteElecciones);
    }
    
    public function CorteVotacion ()
    {
        $Post_Data = file_get_contents('php://input');
        $body = json_decode($Post_Data, true);

        $out = 0;

        $array_data = [
            'valor_unico'  => $body['valorunico'], 
        ];


        $InsertCorteVotacion = $this->CorteElecciones->PdoPostgreFunction('"public".registrarcorte', $array_data, $out);

        // if($InsertCorteVotacion){
        //     echo 'el procedimiento se ejecuta correctamente';
            
        // }else{
        //     echo 'error para ejecutar el procedimiento';
           
        // }

        echo json_encode($out);
     
    }

}