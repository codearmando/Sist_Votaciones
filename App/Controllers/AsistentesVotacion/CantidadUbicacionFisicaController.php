<?php

require_once __Dir__ . '/../../Models/AsistentesVotacion/CantidadUbicacionFisicaModel.php';

Class CantidadUbicacionFisicaController {

    private $CantidadUbicacionFisica;

    public function __construct($conexion){
        $this->CantidadUbicacionFisica = new CantidadUbicacionFisicaModel($conexion);
    }
    public function Table(){
        $ListCantidadUbicacionFisica=$this->CantidadUbicacionFisica->getSelect('*');
        echo json_encode($ListCantidadUbicacionFisica);
    }
}