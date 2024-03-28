<?php

require_once __DIR__ . '/../../Models/AsistentesVotacion/AsistenteCantidadTotalModel.php';

Class AsistenteCantidadTotalController {

    private $AsistenteCantidadTotal;

    public function __construct($conexion){
        $this->AsistenteCantidadTotal = new AsistenteCantidadTotalModel($conexion);
    }

    public function Table(){
        $ListTotalAsistentes= $this->AsistenteCantidadTotal->getSelect('*');
        echo json_encode($ListTotalAsistentes);
    }
}

