<?php

require_once __DIR__ . '/../../Models/AsistentesVotacion/AsistenteNoVotoPorEstadoModel.php';

Class AsistenteNoVotoPorEstadoController {

    private $AsistenteTotalNoVoto;

    public function __construct($conexion){
        $this->AsistenteTotalNoVoto = new AsistenteNoVotoPorEstadoModel($conexion);
    }

    public function Table(){
        $ListTotalAsistentes= $this->AsistenteTotalNoVoto->getSelect('*');
        echo json_encode($ListTotalAsistentes);
    }
}

