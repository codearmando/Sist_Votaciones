<?php

// require_once __DIR__ . '/../Models/Inv_Medicamento/ListMedicamentoModel.php';
require_once __DIR__ . '/../../Models/AsistentesVotacion/AsistenteVotacionModel.php';

Class AsistenteVotacionController {

    private $AsistentesVoto;

    public function __construct($conexion)
    {
        $this->AsistentesVoto = new AsistenteVotacionModel($conexion);
    }

    public function Table (){
        $Post_Data = file_get_contents('php://input');
        $body = json_decode($Post_Data,true);

        $listAsistentesVoto =  $this->AsistentesVoto->getSelectIDParams('*','id_ubica','asistio',$body['id_ubica'],$body['voto']);
        echo json_encode($listAsistentesVoto);
    }
}

