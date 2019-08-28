<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AssetManager extends CI_Controller {

	public function __construct() {
		parent::__construct();
		// check for user authorization
	}

	public function index() {
		if (! $this->session->userdata('email')) { // if the user is not logged in
			$this->load->view('errors/custom/access_denied'); // show a 403 forbidden error
		} else {
			$this->load->model('AssetManager_model');

			$data['active_page'] = 'assetmanager';
			$data['title'] = 'Asset Manager';
			$data['main_content'] = 'private/asset_manager/index';

			$data['data'] = $this->AssetManager_model->get_assets();
			// $data['active_page'] = 'assetmanager';

			$this->load->view('private/reusable/page-template', $data);

	        // $this->load->view('private/asset_manager/index.php',$data);
		}
	}

	public function add_asset() {
		$this->load->helper('form');
		$this->load->library('form_validation');

		$this->load->view('private/asset_manager/add');
	}

	public function edit_asset() {
		$this->load->helper('form');
		$this->load->library('form_validation');

		$this->load->view('private/asset_manager/edit_asset');
	}

}
