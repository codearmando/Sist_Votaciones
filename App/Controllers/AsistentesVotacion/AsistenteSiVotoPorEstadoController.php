<?php

require_once __DIR__ . '/../../Models/AsistentesVotacion/AsistenteSiVotoPorEstadoModel.php';

Class AsistenteSiVotoPorEstadoController {

    private $AsistenteTotalSiVoto;

    public function __construct($conexion){
        $this->AsistenteTotalSiVoto = new AsistenteSiVotoPorEstadoModel($conexion);
    }

    public function Table(){
        $ListTotalAsistentes= $this->AsistenteTotalSiVoto->getSelect('*');
        echo json_encode($ListTotalAsistentes);
    }
}

