<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AssetManager extends CI_Controller {

	public function __construct() { //What for?
		parent::__construct();
		$this->load->model('Common_model');
		$this->load->model('AssetManager_model');
		$this->load->helper("database");
		$this->load->helper("general");
		// check for user authorization
		$this->user_id = $this->session->userdata('id');
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

	public function add() {
		log_message('debug', 'AssetManager: add - in function');
		$asset = array(
			'manufacturer' => $this->input->post('manufacturer'),
			'model' => $this->input->post('model'),
			'owner' => $this->input->post('owner'),
			'serial_number' => $this->input->post('serial_number'),
			'type' => $this->input->post('type'),
			'asset_tag' => $this->input->post('asset_tag'),
			'team' => $this->input->post('team'),
			//'rate' => $this->input->post('rate'),
			'purchase_price' => $this->input->post('purchase_price'),
			'purchase_date' => $this->input->post('purchase_date'),
			'job_number' => $this->input->post('job_number'),
			'location' => $this->input->post('location'),
			'last_modified_by' => $this->user_id,
			'last_modified_time' => date('Y-m-d H:i:s'),
			'created_by' => $this->user_id,
			'created_time' => date('Y-m-d H:i:s')
		);

		$this->AssetManager_model->add($asset);
		echo json_encode("success");
	}

	public function edit_asset() {
		$this->load->helper('form');
		$this->load->library('form_validation');

		$this->load->view('private/asset_manager/edit_asset');
	}

	public function delete($id) {
	log_message('debug', 'AssetManager: delete - in function');

	$this->AssetManager_model->delete($id);
	}

}
