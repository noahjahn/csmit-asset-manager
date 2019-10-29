<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Models extends CI_Controller {

	public function __construct() {
		parent::__construct();
		// check for user authorization
        $this->load->model('Models_model');
		$this->load->model('Models_model');
		$this->load->helper("database");
		$this->load->helper("general");
	}

	public function index() {

	}

    public function add() {
		log_message('debug', 'Models: add - in function');

		if (!$this->input->is_ajax_request()) {
            // echo $this->output_json(['unauthorized']);
            exit;
        }
		$this->form_validation->set_rules($this->Models_model->get_insert_rules());
		if ($this->form_validation->run() == TRUE) {
			$name = $this->input->post('name');

			$this->Models_model->insert($name);

			echo json_encode("success");

		} else {
			$errors = array(
                'name' => form_error('name')
            );
			echo json_encode($errors);
		}
    }

	public function validate_add_name() {
		log_message('debug', 'Models: validate_add_name - in function');

		if (!$this->input->is_ajax_request()) {
			// echo $this->output_json(['unauthorized']);
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

    public function edit() {
		log_message('debug', 'Models: edit - in function');
		if (!$this->input->is_ajax_request()) {
            // echo $this->output_json(['unauthorized']);
            exit;
        }

		$this->form_validation->set_rules($this->Models_model->get_update_rules());
		if ($this->form_validation->run() == TRUE) {
			$id = $this->input->post('id');
			$name = $this->input->post('name');

			$this->Models_model->update($id, $name);

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
            // echo $this->output_json(['unauthorized']);
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

    public function delete($id) {
		log_message('debug', 'Models: delete - in function');

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

}
