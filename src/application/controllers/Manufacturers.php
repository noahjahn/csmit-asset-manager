<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Manufacturers extends CI_Controller {

	public function __construct() {
		parent::__construct();
		// check for user authorization
        $this->load->model('Manufacturers_model');
		$this->load->helper("database");
	}

	public function index() {

	}

    public function add() {
		$this->Manufacturers_model->add_manufacturer();
    }

    public function edit() {
		$this->Manufacturers_model->add_manufacturer();
    }

    public function delete($id) {
        $this->Manufacturers_model->delete_manufacturer($id);
    }

	public function get_all_json() {
		$manufacturers = $this->Manufacturers_model->get_active_Manufacturers();
		$manufacturers = $manufacturers->result_array();
		$json_manufacturers = json_encode($manufacturers, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
		echo $json_manufacturers;
	}

}
