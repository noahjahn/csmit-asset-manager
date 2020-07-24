<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Models extends CI_Controller {

	private $user_id;
	private $user_role_id;

	public function __construct() {
		parent::__construct();
		// check for user authorization
        $this->load->model('Models_model');
		$this->load->model('Manufacturers_model');
		$this->load->helper("database");
		$this->load->helper("general");
		$this->user_id = $this->session->userdata('id');
		$this->user_role_id = $this->session->userdata('role');
	}

	public function index() {

	}

    public function add() {
		log_message('debug', 'Models: add - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
            exit;
        }
		$this->form_validation->set_rules($this->Models_model->get_insert_rules());
		if ($this->form_validation->run() == TRUE) {
			$model = array(
				'name' => $this->input->post('name'),
				'manufacturer_id' => $this->input->post('manufacturer_id'),
				'type_id' => $this->input->post('type_id'),
				'rate' => $this->input->post('rate'),
				'last_modified_by' => $this->user_id,
				'last_modified_time' => date('Y-m-d H:i:s'),
				'created_by' => $this->user_id,
				'created_time' => date('Y-m-d H:i:s')
			);

			$this->Models_model->insert($model);

			echo json_encode("success");

		} else {
			$errors = array(
				'name' => form_error('name'),
				'rate' => form_error('rate'),
            );
			echo json_encode($errors);
		}
    }

	public function validate_add_name() {
		log_message('debug', 'Models: validate_add_name - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
            exit;
        }

		$this->form_validation->set_rules(array($this->Models_model->get_insert_name_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Models: validate_add_name - failed to validate name');
			$errors = array(
				'name' => form_error('name'),
			);
			echo json_encode($errors);
		}
	}

	public function validate_add_manufacturer() {
		log_message('debug', 'Models: validate_add_manufacturer - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
            exit;
        }

		$this->form_validation->set_rules(array($this->Models_model->get_insert_manufacturer_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Models: validate_add_manufacturer - failed to validate manufacturer');
			$errors = array(
				'manufacturer' => form_error('manufacturer'),
			);
			echo json_encode($errors);
		}
	}

	public function validate_add_type() {
		log_message('debug', 'Models: validate_add_type - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
            exit;
        }

		$this->form_validation->set_rules(array($this->Models_model->get_insert_type_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Models: validate_add_type - failed to validate type');
			$errors = array(
				'type' => form_error('type'),
			);
			echo json_encode($errors);
		}
	}

	public function validate_add_rate() {
		log_message('debug', 'Models: validate_add_rate - in function');

		if (!$this->input->is_ajax_request()) {
			redirect('forbidden');
		}

		$this->form_validation->set_rules(array($this->Models_model->get_insert_rate_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Models: validate_add_rate - failed to validate rate');
			$errors = array(
				'rate' => form_error('rate'),
			);
			echo json_encode($errors);
		}
	}

    public function edit() {
		log_message('debug', 'Models: edit - in function');
		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
            exit;
        }

		$this->form_validation->set_rules($this->Models_model->get_update_rules());
		if ($this->form_validation->run() == TRUE) {
			$model = array(
				'id' => $this->input->post('id'),
				'name' => $this->input->post('name'),
				'manufacturer_id' => $this->input->post('manufacturer_id'),
				'type_id' => $this->input->post('type_id'),
				'rate' => $this->input->post('rate'),
				'last_modified_by' => $this->user_id,
				'last_modified_time' => date('Y-m-d H:i:s')
			);

			$this->Models_model->update($model);

			echo json_encode("success");
		} else {
			log_message('debug', 'Models: edit - failed to validate input');
			$errors = array(
				'id' => form_error('id'),
                'name' => form_error('name')
            );
			echo json_encode($errors);
		}
    }

	public function validate_edit_name() {
		log_message('debug', 'Models: validate_edit_name - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
            exit;
        }

		$this->form_validation->set_rules(array($this->Models_model->get_update_name_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Models: validate_edit_name - failed to validate name');
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
		log_message('debug', 'Models: delete - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
            exit;
        }

		$this->Models_model->delete($id);
    }

	public function get_active() {
		log_message('debug', 'Models: get_active - in function');

		$active_models = $this->Models_model->get_active();
		$json_models = json_encode($active_models);
		echo $json_models;
	}

	function is_name_unique($name) {
		log_message('debug', 'Models: is_name_unique - in function');

		return $this->Models_model->is_name_unique($name);
	}

	function is_name_unique_not_different_from_current($name) {
		log_message('debug', 'Models: is_name_unique_not_different_from_current - in function');

		$id = $this->input->post('id');
		return $this->Models_model->is_name_unique_not_different_from_current($name, $id);
	}

	function id_exists($id) {
		log_message('debug', 'Models: id_exists - in function');

		return $this->Models_model->id_exists($id);
	}

	function manufacturer_exists($id) {
		log_message('debug', 'Models: manufacturer_exists - in function');

		if ($this->Manufacturers_model->id_exists($id)) {
			return TRUE;
		} else {
			return FALSE;
		}
	}

	function type_exists($id) {
		log_message('debug', 'Models:type_exists - in function');
		$this->load->model('AssetTypes_model');
		if ($this->AssetTypes_model->id_exists($id)) {
			return TRUE;
		} else {
			return FALSE;
		}
	}

}
