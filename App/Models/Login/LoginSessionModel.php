<?php

class LoginSessionModel extends Orm {
    public function __construct($connection)
    {
        // parent::__construct('"CACS".USUARIOS',$connection);
        parent::__construct('"public".usuarios_view',$connection);
    }
}