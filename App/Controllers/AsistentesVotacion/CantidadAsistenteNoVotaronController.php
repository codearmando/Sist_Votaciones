<?php

require_once __DIR__ . '/../../Models/AsistentesVotacion/CantidadAsistenteNoVotaronModel.php';

Class CantidadAsistenteNoVotaronController {

    private $AsistenteCantidadNoVotaron;

    public function __construct($conexion){
        $this->AsistenteCantidadNoVotaron = new CantidadAsistenteNoVotaronModel($conexion);
    }

    public function Table(){
        $ListTotalAsistentes= $this->AsistenteCantidadNoVotaron->getSelect('*');
        echo json_encode($ListTotalAsistentes);
    }
}

