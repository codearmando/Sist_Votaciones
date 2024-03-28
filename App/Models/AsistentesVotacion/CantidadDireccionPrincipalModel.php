<?php

class CantidadDireccionPrincipalModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".total_direcciones_ivss_view',$connection);
    }
}