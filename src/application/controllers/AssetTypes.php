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
		log_message('debug', 'AssetTypes: add - in function');

		if (!$this->input->is_ajax_request()) {
            // echo $this->output_json(['unauthorized']);
            exit;
        }
		$this->form_validation->set_rules($this->AssetTypes_model->get_insert_rules());
		if ($this->form_validation->run() == TRUE) {
			$name = $this->input->post('name');
			$rate = $this->input->post('rate');

			$this->AssetTypes_model->insert($name, $rate);

			echo json_encode("success");

		} else {
			$errors = array(
                'name' => form_error('name'),
                'rate' => form_error('rate')
            );
			echo json_encode($errors);
		}
    }

	public function validate_add_name() {
		log_message('debug', 'AssetTypes: validate_add_name - in function');

		if (!$this->input->is_ajax_request()) {
			// echo $this->output_json(['unauthorized']);
			exit;
		}

		$this->form_validation->set_rules(array($this->AssetTypes_model->get_insert_name_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'AssetTypes: validate_add_name - failed to validate name');
			$errors = array(
				'name' => form_error('name'),
			);
			echo json_encode($errors);
		}
	}

	public function validate_add_rate() {
		log_message('debug', 'AssetTypes: validate_add_rate - in function');

		if (!$this->input->is_ajax_request()) {
			// echo $this->output_json(['unauthorized']);
			exit;
		}

		$this->form_validation->set_rules(array($this->AssetTypes_model->get_insert_rate_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'AssetTypes: validate_add_rate - failed to validate rate');
			$errors = array(
				'rate' => form_error('rate'),
			);
			echo json_encode($errors);
		}
	}

    public function edit() {
		log_message('debug', 'AssetTypes: edit - in function');
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
			log_message('debug', 'AssetTypes: edit - failed to validate input');
			$errors = array(
				'id' => form_error('id'),
                'name' => form_error('name'),
                'rate' => form_error('rate')
            );
			echo json_encode($errors);
		}
    }

	public function validate_edit_name() {
		log_message('debug', 'AssetTypes: validate_edit_name - in function');

		if (!$this->input->is_ajax_request()) {
            // echo $this->output_json(['unauthorized']);
            exit;
        }

		$this->form_validation->set_rules(array($this->AssetTypes_model->get_update_name_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'AssetTypes: validate_edit_name - failed to validate name');
			$errors = array(
                'name' => form_error('name'),
            );
			echo json_encode($errors);
		}
	}

	public function validate_edit_rate() {
		log_message('debug', 'AssetTypes: validate_edit_rate - in function');
		$this->validate_add_rate();
	}

    public function delete($id) {
		log_message('debug', 'AssetTypes: delete - in function');

        $this->AssetTypes_model->delete($id);
    }

	public function get_active() {
		log_message('debug', 'AssetTypes: get_active - in function');

		$active_asset_types = $this->AssetTypes_model->get_active();
		$json_asset_types = json_encode($active_asset_types);
		echo $json_asset_types;
	}

	function is_name_unique($name) {
		log_message('debug', 'AssetTypes: is_name_unique - in function');

		return $this->AssetTypes_model->is_name_unique($name);
	}

	function is_name_unique_not_different_from_current($name) {
		log_message('debug', 'AssetTypes: is_name_unique_not_different_from_current - in function');

		$id = $this->input->post('id');
		return $this->AssetTypes_model->is_name_unique_not_different_from_current($name, $id);
	}

	function id_exists($id) {
		log_message('debug', 'AssetTypes: id_exists - in function');

		return $this->AssetTypes_model->id_exists($id);
	}
}
