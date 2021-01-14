<?php

class ClientException extends Exception
{
    public function __construct($property, $error, $message, $code = -1, $previous = null) {

        parent::__construct($message, $code, $previous);
    }

    public function getProperty() {
        return $this->property;
    }

    public function getError() {
        return $this->error;
    }
}

?>
