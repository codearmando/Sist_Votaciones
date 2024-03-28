<?php

require_once __DIR__ . '/../../Models/AsistentesVotacion/AsistenteTotalPorEstadoModel.php';

Class AsistenteTotalPorEstadoController {

    private $AsistenteCantidadTotal;

    public function __construct($conexion){
        $this->AsistenteCantidadTotal = new AsistenteTotalPorEstadoModel($conexion);
    }

    public function Table(){
        $ListTotalAsistentes= $this->AsistenteCantidadTotal->getSelect('*');
        echo json_encode($ListTotalAsistentes);
    }
}

