<?php

class CorteIvssModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".reporte_corte_ubic_dir_general_view',$connection);
    }
}