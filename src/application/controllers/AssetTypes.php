<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AssetTypes extends CI_Controller {

	private $user_id;
	private $user_role_id;

	public function __construct() {
		parent::__construct();
        $this->load->model('AssetTypes_model');
		$this->load->helper("database");
		$this->load->helper("general");
		$this->load->helper("authorization");
		$this->user_id = $this->session->userdata('id');
		$this->user_role_id = $this->session->userdata('role');
		$this->page = 'asset_groups';
		if ( ! $this->session->userdata('id')) { // if the user is not logged in
            redirect(base_url());
		}
		if ( ! is_authorized($this->user_role_id, $this->page)) {
			redirect('forbidden');
		}

		if ($this->uri->total_segments() > 1) {
			if ( ! $this->uri->segment(2) == 'get_active') {
				if ( ! has_write_access($this->user_role_id, $this->page)) {
					redirect('forbidden');
				}
			}
		}
	}

    public function add() {
		log_message('debug', 'AssetTypes: add - in function');

		if (!$this->input->is_ajax_request()) {
			redirect('forbidden');
        }

		$this->form_validation->set_rules($this->AssetTypes_model->get_insert_rules());
		if ($this->form_validation->run() == TRUE) {
			$asset_type = array(
				'name' => $this->input->post('name'),
				'rate' => $this->input->post('rate'),
				'last_modified_by' => $this->user_id,
				'last_modified_time' => date('Y-m-d H:i:s'),
				'created_by' => $this->user_id,
				'created_time' => date('Y-m-d H:i:s')
			);

			$this->AssetTypes_model->insert($asset_type);

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
			redirect('forbidden');
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
			redirect('forbidden');
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
            redirect('forbidden');
        }

		$this->form_validation->set_rules($this->AssetTypes_model->get_update_rules());
		if ($this->form_validation->run() == TRUE) {
			$asset_type = array(
				'id' => $this->input->post('id'),
				'name' => $this->input->post('name'),
				'rate' => $this->input->post('rate'),
				'last_modified_by' => $this->user_id,
				'last_modified_time' => date('Y-m-d H:i:s'),
			);

			$this->AssetTypes_model->update($asset_type);

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
            redirect('forbidden');
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

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
        }

		$this->validate_add_rate();
	}

    public function delete($id) {
		log_message('debug', 'AssetTypes: delete - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
        }

        $this->AssetTypes_model->delete($id);
    }

	public function get_active() {
		log_message('debug', 'AssetTypes: get_active - in function');

		if (!$this->input->is_ajax_request()) {
            // redirect('forbidden');
        }

		$active_asset_types = $this->AssetTypes_model->get_active();
		$json_asset_types = json_encode($active_asset_types);
		echo $json_asset_types;
	}

	public function is_name_unique($name) {
		log_message('debug', 'AssetTypes: is_name_unique - in function');

		return $this->AssetTypes_model->is_name_unique($name);
	}

	public function is_name_unique_not_different_from_current($name) {
		log_message('debug', 'AssetTypes: is_name_unique_not_different_from_current - in function');

		$id = $this->input->post('id');
		return $this->AssetTypes_model->is_name_unique_not_different_from_current($name, $id);
	}

	public function id_exists($id) {
		log_message('debug', 'AssetTypes: id_exists - in function');

		return $this->AssetTypes_model->id_exists($id);
	}
}
