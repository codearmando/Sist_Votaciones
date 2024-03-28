<?php

// require_once __DIR__ . '/../Models/Inv_Medicamento/TipoAlmacenModel.php';
require_once __DIR__ . '/../../Models/Ciudadano/CiudadanoModel.php';

Class CiudadanoController {

    private $ciudadano;

    public function __construct($conexion)
    {
        $this->ciudadano = new CiudadanoModel($conexion);
    }

    public function Table (){
        $Post_Data = file_get_contents('php://input');
        $body = json_decode($Post_Data,true);

        $dataCiudadano =  $this->ciudadano->getSelectIDParam('*','nac_cedula','id_direccion',$body['cedulanac'],$body['iddireccion']);
        echo json_encode($dataCiudadano);
        // $datausuariosadministradores =  $this->usuariosadministradores->getSelectIDParam('*','cedula','contrasena', $body['user'],$pass_hash);
        // echo json_encode($datausuariosadministradores);
    }
    public function buscpaciretirado (){
        $Post_Data = file_get_contents('php://input');
        $body = json_decode($Post_Data,true);

        $dataCiudadano =  $this->ciudadano->getSelect('*','CEDULA',$body['ci']);
        echo json_encode($dataCiudadano);
    }
}