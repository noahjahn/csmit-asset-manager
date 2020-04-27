<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AssetManager extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('AssetManager_model');
		$this->load->helper("authorization");
		$this->user_id = $this->session->userdata('id');
		$this->user_role_id = $this->session->userdata('role');
		$this->page = 'asset_manager';
		if (! $this->session->userdata('id')) { // if the user is not logged in
            redirect(base_url());
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

	public function add() {
		log_message('debug', 'AssetManager: add - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
            exit;
        }

		$this->form_validation->set_rules($this->AssetManager_model->get_insert_rules());
		if ($this->form_validation->run() == TRUE) {
			$asset = array(
				'model_id' => $this->input->post('model_id'),
				'owner' => $this->input->post('owner'),
				'serial_number' => $this->input->post('serial_number'),
				'asset_tag' => $this->input->post('asset_tag'),
				'team_id' => $this->input->post('team_id'),
				'purchase_price' => $this->input->post('purchase_price'),
				'purchase_date' => $this->input->post('purchase_date'),
				'job_number' => $this->input->post('job_number'),
				'notes' => $this->input->post('notes'),
				'last_modified_by' => $this->user_id,
				'last_modified_time' => date('Y-m-d H:i:s'),
				'created_by' => $this->user_id,
				'created_time' => date('Y-m-d H:i:s')
			);

			log_message('debug', print_r($asset, TRUE));

			$this->AssetManager_model->insert($asset);
			echo json_encode("success");
			log_message('debug', 'AssetManager: add - successfully added asset');
		} else {
			$errors = array(
                'model_id' => form_error('model_id'),
				'owner' => form_error('owner'),
                'serial_number' => form_error('serial_number'),
                'asset_tag' => form_error('asset_tag'),
				'team_id' => form_error('team_id'),
                'purchase_price' => form_error('purchase_price'),
				'purchase_date' => form_error('purchase_date'),
				'job_number' => form_error('job_number')
            );
			echo json_encode($errors);
		}
	}

	public function edit() {
		log_message('debug', 'AssetManager: edit - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
            exit;
        }

		$this->form_validation->set_rules($this->AssetManager_model->get_update_rules());
		if ($this->form_validation->run() == TRUE) {
			$asset = array(
				'id' => $this->input->post('id'),
				'model_id' => $this->input->post('model_id'),
				'owner' => $this->input->post('owner'),
				'serial_number' => $this->input->post('serial_number'),
				'asset_tag' => $this->input->post('asset_tag'),
				'team_id' => $this->input->post('team_id'),
				'purchase_price' => $this->input->post('purchase_price'),
				'purchase_date' => $this->input->post('purchase_date'),
				'job_number' => $this->input->post('job_number'),
				'notes' => $this->input->post('notes'),
				'last_modified_by' => $this->user_id,
				'last_modified_time' => date('Y-m-d H:i:s'),
			);

			$this->AssetManager_model->update($asset);
			echo json_encode("success");
			log_message('debug', 'AssetManager: edit - successfully updated asset');
		} else {
			$errors = array(
                'manufacturer_id' => form_error('manufacturer_id'),
                'model_id' => form_error('model_id'),
				'owner' => form_error('owner'),
                'serial_number' => form_error('serial_number'),
				'type_id' => form_error('type_id'),
                'asset_tag' => form_error('asset_tag'),
				'team_id' => form_error('team_id'),
                'purchase_price' => form_error('purchase_price'),
				'purchase_date' => form_error('purchase_date'),
				'job_number' => form_error('job_number')
            );
			echo json_encode($errors);
		}
	}

	public function delete($id) {
		log_message('debug', 'AssetManager: delete - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
            exit;
        }

		$this->AssetManager_model->delete($id);
	}

	public function is_asset_tag_unique($asset_tag) {
		log_message('debug', 'AssetManager: is_asset_tag_unique - in function');

		return $this->AssetManager_model->is_asset_tag_unique($asset_tag);
	}

	public function is_serial_number_unique_not_different_from_current($serial_number) {
		log_message('debug', 'AssetManager: is_serial_number_unique_not_different_from_current - in function');

		$id = $this->input->post('id');
		return $this->AssetManager_model->is_serial_number_unique_not_different_from_current($serial_number, $id);
	}

	public function is_asset_tag_unique_not_different_from_current($asset_tag) {
		log_message('debug', 'AssetManager: is_asset_tag_unique_not_different_from_current - in function');

		$id = $this->input->post('id');
		return $this->AssetManager_model->is_asset_tag_unique_not_different_from_current($asset_tag, $id);
	}

}
