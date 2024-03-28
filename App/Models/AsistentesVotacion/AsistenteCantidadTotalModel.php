<?php

class AsistenteCantidadTotalModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".total_asist_ivss_view',$connection);
    }
}