<?php

class LoginAsistenteModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".usuario_asistente_view',$connection);
    }
}