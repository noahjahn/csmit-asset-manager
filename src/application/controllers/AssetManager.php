<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AssetManager extends CI_Controller {

	public function __construct() { //What for?
		parent::__construct();
		$this->load->model('Common_model');
		$this->load->model('AssetManager_model');
		// check for user authorization
	}

	public function index() {
		if (! $this->session->userdata('email')) { // if the user is not logged in
			$this->load->view('errors/custom/access_denied'); // show a 403 forbidden error
		} else {

			$data['active_page'] = 'assetmanager';
			$data['title'] = 'Asset Manager';
			$data['main_content'] = 'private/asset_manager/index';
			$data['userdata'] = $this->session->all_userdata();
			// $data['active_page'] = 'assetmanager';

			$this->load->view('private/reusable/page-template', $data);

	        // $this->load->view('private/asset_manager/index.php',$data);
		}
	}

	public function get_active() {
		log_message('debug', 'AssetManager: get_active - in function');

		$active_assets = $this->AssetManager_model->get_active();
		$json_assets = json_encode($active_assets);
		echo $json_assets;
	}

	public function add_asset() {
		$this->load->helper('form');
		$this->load->library('form_validation');

		$this->load->view('private/asset_manager/add_asset');
	}

	public function edit_asset() {
		$this->load->helper('form');
		$this->load->library('form_validation');

		$this->load->view('private/asset_manager/edit_asset');
	}

	public function delete_asset() {
	}

}
