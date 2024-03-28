<?php

class LoginAdministradorModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".usuario_administradores_view',$connection);
    }
}