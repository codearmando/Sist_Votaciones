<?php

class AsistenteSiVotoPorEstadoModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".count_asistentes_voto_estado_view',$connection);
    }
}