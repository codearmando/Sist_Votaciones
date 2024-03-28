<?php

class AsistenteNoVotoPorEstadoModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".count_asistentes_novoto_estado_view',$connection);
    }
}