<?php

class AsistenteVotacionModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".asistente_voto_view',$connection);
    }
}