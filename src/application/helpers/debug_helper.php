<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if(!function_exists('write_to_console')) {
    function write_to_console($value) {
        sleep(1);
        echo '<script> console.log("' . $value . '") </script>';
    }
}

if (!function_exists('debug')) {
    function debug() {
        return get_instance()->config->item('debug');
    }
}
?>
