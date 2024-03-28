<?php

class CorteVotacionModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".cortes_elec_view',$connection);
    }
}