<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Teams extends CI_Controller {

	public function __construct() {
		parent::__construct();
		// check for user authorization
        $this->load->model('Teams_model');
		$this->load->helper("database");
	}

	public function index() {

	}

    public function add() {
		$this->Teams_model->add_team();
    }

    public function edit() {
		$this->Teams_model->add_team();
    }

    public function delete($id) {
        $this->Teams_model->delete_team($id);
    }

	public function get_all_json() {
		$teams = $this->Teams_model->get_active_teams();
		$teams = $teams->result_array();
		$json_teams = json_encode($teams, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
		echo $json_teams;
	}

}
