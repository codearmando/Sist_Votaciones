<?php

// require_once __DIR__ . '/../Models/Inv_Medicamento/ListMedicamentoModel.php';
require_once __DIR__ . '/../../Models/DataVotaciones/ListDireccionGeneralModel.php';

Class ListDireccionGeneralController {

    private $Direccion;

    public function __construct($conexion)
    {
        $this->Direccion = new ListDireccionGeneralModel($conexion);
    }

    public function Table (){
        $listDireccion =  $this->Direccion->getSelect('*');
        echo json_encode($listDireccion);
    }
}