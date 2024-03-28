<?php

// require_once __DIR__ . '/../Models/Inv_Medicamento/ListMedicamentoModel.php';
require_once __DIR__ . '/../../Models/DataVotaciones/ListUbicacionFisicaModel.php';

Class ListUbicacionFisicaController {

    private $UbicacionFisica;

    public function __construct($conexion)
    {
        $this->UbicacionFisica = new ListUbicacionFisicaModel($conexion);
    }

    public function Table (){
        $listUbicacionFisica =  $this->UbicacionFisica->getSelect('*');
        echo json_encode($listUbicacionFisica);
    }
}