<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AssetTypes extends CI_Controller {

	public function __construct() {
		parent::__construct();
		// check for user authorization

        $this->load->model('AssetTypes_model');
		$this->load->helper("database");
	}

	public function index() {

	}

    public function add() {

    }

    public function edit() {

    }

    public function delete($id) {
        $this->AssetTypes_model->delete_asset_type($id);
    }

}
