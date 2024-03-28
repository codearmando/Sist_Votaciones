<?php

// require_once __DIR__ . '/../Models/Inv_Medicamento/ListMedicamentoModel.php';
require_once __DIR__ . '/../../Models/Ciudadano/ListDireccionAsistenteModel.php';

Class ListDireccionAsistenteController {

    private $Direccion;

    public function __construct($conexion)
    {
        $this->Direccion = new ListDireccionAsistenteModel($conexion);
    }

    public function Table (){
        $listDireccion =  $this->Direccion->getSelect('*');
        echo json_encode($listDireccion);
    }
}