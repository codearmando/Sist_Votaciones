<?php

class CantidadAsistenteSiVotaronModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".cantidad_voto_view',$connection);
    }
}