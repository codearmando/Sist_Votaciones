<?php

class CantidadAsistenteNoVotaronModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".cantidad_no_voto_view',$connection);
    }
}