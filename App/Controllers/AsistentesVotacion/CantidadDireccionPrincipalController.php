<?php

require_once __Dir__ . '/../../Models/AsistentesVotacion/CantidadDireccionPrincipalModel.php';

Class CantidadDireccionPrincipalController {

    private $CantidadAsistenteDireccionprincipal;

    public function __construct($conexion){
        $this->CantidadAsistenteDireccionprincipal = new CantidadDireccionPrincipalModel($conexion);
    }
    public function Table(){
        $ListCantidadAsistentesDireccion=$this->CantidadAsistenteDireccionprincipal->getSelect('*');
        echo json_encode($ListCantidadAsistentesDireccion);
    }
}