<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AssetManager extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('AssetManager_model');
		$this->load->helper("authorization");
		$this->user_id = $this->session->userdata('id');
		$this->user_role_id = $this->session->userdata('id');
		$this->page = 'dashboard';
		if (! $this->session->userdata('id')) { // if the user is not logged in
            redirect('unauthorized');
		}
		if ( ! is_authorized($this->user_role_id, $this->page)) {
			redirect('forbidden');
		}
	}

	public function index() {
		$data['active_page'] = 'assetmanager';
		$data['title'] = 'Asset Manager';
		$data['main_content'] = 'private/asset_manager/index';
		$data['userdata'] = $this->session->all_userdata();

		$this->load->view('private/reusable/page-template', $data);
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
