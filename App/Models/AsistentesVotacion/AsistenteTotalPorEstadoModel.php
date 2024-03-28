<?php

class AsistenteTotalPorEstadoModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".count_asistentes_total_estado_view',$connection);
    }
}