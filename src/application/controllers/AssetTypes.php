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
		$this->AssetTypes_model->add_asset_type();
    }

    public function edit() {
		$this->AssetTypes_model->add_asset_type();
    }

    public function delete($id) {
        $this->AssetTypes_model->delete_asset_type($id);
    }

	public function get_all_json() {
		$asset_types = $this->AssetTypes_model->get_active_asset_types();
		$asset_types = $asset_types->result_array();
		$json_asset_types = json_encode($asset_types, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
		echo $json_asset_types;
	}

}
