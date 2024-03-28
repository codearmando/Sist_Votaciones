<?php

class CantidadUbicacionFisicaModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".total_ubicaciones_ivss_view',$connection);
    }
}