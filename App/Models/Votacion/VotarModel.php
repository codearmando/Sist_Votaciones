<?php

class VotarModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".asistente_elec_nac_view',$connection);
    }
}