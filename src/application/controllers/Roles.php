<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Roles extends CI_Controller {

	public function __construct() {
		parent::__construct();
		// check for user authorization
        $this->load->model('Roles_model');
		$this->load->helper("database");
		$this->load->helper("general");
		$this->user_id = $this->session->userdata('id');
	}

	public function index() {

	}

    public function get_active() {
		log_message('debug', 'Roles: get_active - in function');

		$active_roles = $this->Roles_model->get_active();
		$json_roles = json_encode($active_roles);
		echo $json_roles;
    }
}

?>
