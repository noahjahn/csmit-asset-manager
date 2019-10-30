<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if ( ! function_exists('build_json_response')) {
    function build_json_response($output = array(), $status) {
        $ci =& get_instance();
        if ($output != '') {
            if ($status != '') {
    			$ci->output->set_status_header($status);
    			$ci->output->set_content_type('application/json');
    			$ci->output->set_output(json_encode($output), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    			return $ci->output->get_output();
    		} else {
                log_message('error', 'general_helper: build_json_response - failed, tried to build json with no response!');
            }
        } else {
            log_message('error', 'general_helper: build_json_response - failed, tried to build json with no output!');
        }
    }
}

?>
