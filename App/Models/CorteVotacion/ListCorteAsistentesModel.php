<?php

class ListCorteAsistentesModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".asistentes_cortes_view',$connection);
    }
}