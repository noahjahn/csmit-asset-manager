<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AssetTypes extends CI_Controller {

	public function __construct() {
		parent::__construct();
		// check for user authorization
        $this->load->model('AssetTypes_model');
		$this->load->helper("database");
		$this->load->helper("general");
	}

	public function index() {

	}

    public function add() {
		if (!$this->input->is_ajax_request()) {
            // echo $this->output_json(['unauthorized']);
            exit;
        }
		$this->form_validation->set_rules($this->AssetTypes_model->get_add_rules());
		if ($this->form_validation->run() == TRUE) {
			$name = $this->input->post('name');
			$rate = $this->input->post('rate');

			$this->AssetTypes_model->add($name, $rate);

			echo json_encode("success");

		} else {
			// echo build_json_response(validation_errors(), 200);
			$errors = array(
                'name' => form_error('name'),
                'rate' => form_error('rate')
            );
			echo json_encode($errors);
		}
    }

    public function edit() {
		if (!$this->input->is_ajax_request()) {
            // echo $this->output_json(['unauthorized']);
            exit;
        }
		$this->form_validation->set_rules($this->AssetTypes_model->get_update_rules());
		if ($this->form_validation->run() == TRUE) {
			$id = $this->input->post('id');
			$name = $this->input->post('name');
			$rate = $this->input->post('rate');

			$this->AssetTypes_model->update($id, $name, $rate);

			echo json_encode("success");

		} else {
			// echo build_json_response(validation_errors(), 200);
			$errors = array(
                'name' => form_error('name'),
                'rate' => form_error('rate')
            );
			echo json_encode($errors);
		}
    }

    public function delete($id) {
        $this->AssetTypes_model->delete($id);
    }

	public function get_active() {
		$active_asset_types = $this->AssetTypes_model->get_active();
		$active_asset_types = $active_asset_types->result_array();
		$json_asset_types = json_encode($active_asset_types, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
		echo $json_asset_types;
	}

	public function is_name_unique($name) {
		return $this->AssetTypes_model->is_name_unique($name);
	}
}
