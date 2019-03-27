<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AssetManager extends CI_Controller {

	public function __construct() {
		parent::__construct();

	}

	public function index() {
		$this->load->model('AssetManager_model');
		$data['assets'] = $this->AssetManager_model->get_assets();
        $this->load->view("private/asset_manager/index.php",$data);
	}

	public function create_asset() {

	}

	public function edit_asset() {
		$this->load->view("private/asset_manager/edit_asset.php");
	}

}
