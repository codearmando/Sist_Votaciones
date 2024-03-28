<?php

require_once __DIR__ . '/../../Models/AsistentesVotacion/CantidadAsistenteSiVotaronModel.php';

Class CantidadAsistenteSiVotaronController {

    private $AsistenteCantidadSiVotaron;

    public function __construct($conexion){
        $this->AsistenteCantidadSiVotaron = new CantidadAsistenteSiVotaronModel($conexion);
    }

    public function Table(){
        $ListTotalAsistentes= $this->AsistenteCantidadSiVotaron->getSelect('*');
        echo json_encode($ListTotalAsistentes);
    }
}

