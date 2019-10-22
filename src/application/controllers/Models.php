<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Models extends CI_Controller {

	public function __construct() {
		parent::__construct();
		// check for user authorization
        $this->load->model('Models_model');
		$this->load->helper("database");
	}

	public function index() {

	}

    public function add() {
		$this->Models_model->add_model();
    }

    public function edit() {
		$this->Models_model->add_model();
    }

    public function delete($id) {
        $this->Models_model->delete_model($id);
    }

	public function get_active() {
		$active_models = $this->Models_model->get_active_models();
		$active_models = $active_models->result_array();
		$json_models = json_encode($active_models, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
		echo $json_models;
	}

}
