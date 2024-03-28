<?php

require_once __DIR__. '/../../Models/CorteVotacion/ListCorteAsistentesModel.php';

class ListCorteAsistentesController {

    private $ListCorteAsistentes;

    public function __construct($conexion) {
        $this->ListCorteAsistentes = new ListCorteAsistentesModel($conexion);
    }

    public function Table (){
        $Post_Data = file_get_contents('php://input');
        $body = json_decode($Post_Data, true);
        
        $listcorte = $this->ListCorteAsistentes->getSelectIDParams('*','id_corte','id_direccion',$body['idcorte'],$body['iddirecicon']);
        echo json_encode($listcorte);
    }
}