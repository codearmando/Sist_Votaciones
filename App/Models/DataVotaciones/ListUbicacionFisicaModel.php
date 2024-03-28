<?php

class ListUbicacionFisicaModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".ubicacion_fisica_view',$connection);
    }
}