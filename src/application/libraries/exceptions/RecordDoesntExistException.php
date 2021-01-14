<?php

require_once APPPATH.'libraries/exceptions/ClientException.php';

class RecordDoesntExistException extends ClientException
{
    public function __construct($property, $message, $previous = null) {
        $error = 'Record doesn\'t exist';
        $code = 404;
        parent::__construct($property, $error, $message, $code, $previous);
    }
}

?>
