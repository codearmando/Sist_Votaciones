<?php

require_once __DIR__. '/../../Models/CorteIvss/CorteIvssModel.php';

class CorteIvssController {

    private $CorteIvss;

    public function __construct($conexion) {
        $this->CorteIvss = new CorteIvssModel($conexion);
    }

    public function Table (){
        $Post_Data = file_get_contents('php://input');
        $body = json_decode($Post_Data, true);
        
        $listcorteivss = $this->CorteIvss->getSelect('*');
        echo json_encode($listcorteivss);
    }
}