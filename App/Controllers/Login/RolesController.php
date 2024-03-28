<?php

// require_once __DIR__ . '/../Models/Inv_Medicamento/TipoAlmacenModel.php';
require_once __DIR__ . '/../../Models/Login/RolesModel.php';

Class RolesController {

    private $rolesusuarios;

    public function __construct($conexion)
    {
        $this->rolesusuarios = new RolesModel($conexion);
    }
    public function Table (){
        $datarolesusuarios =  $this->rolesusuarios->getSelect('*');
        echo json_encode($datarolesusuarios);
    }

    
}