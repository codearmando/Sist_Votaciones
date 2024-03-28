<?php

class ListDireccionGeneralModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".direccion_general_view',$connection);
    }
}



