<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Controller {

	public function __construct() {
		parent::__construct();
		// check for user authorization
        $this->load->model('Users_model');
		$this->load->helper("database");
		$this->load->helper("general");
	}

	public function index() {

	}

    public function add() {
		log_message('debug', 'Users: add - in function');

		if (!$this->input->is_ajax_request()) {
            // echo $this->output_json(['unauthorized']);
            exit;
        }
		$this->form_validation->set_rules($this->Users_model->get_insert_rules());
		if ($this->form_validation->run() == TRUE) {
			$user = array(
				'first_name' => $this->input->post('first_name'),
				'last_name' => $this->input->post('last_name'),
				'email' => $this->input->post('email'),
				'password' => $this->input->post('password')
			);

			$this->Users_model->insert($user);

			echo json_encode("success");

		} else {
			$errors = array(
                'first_name' => form_error('first_name'),
                'last_name' => form_error('last_name'),
				'email' => form_error('email'),
                'password' => form_error('password')
            );
			echo json_encode($errors);
		}
    }

	public function validate_add_first_name() {
		log_message('debug', 'Users: validate_add_first_name - in function');

		if (!$this->input->is_ajax_request()) {
			// echo $this->output_json(['unauthorized']);
			exit;
		}

		$this->form_validation->set_rules(array($this->Users_model->get_insert_first_name_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Users: validate_add_first_name - failed to validate first name');
			$errors = array(
				'first_name' => form_error('first_name'),
			);
			echo json_encode($errors);
		}
	}

	public function validate_add_last_name() {
		log_message('debug', 'Users: validate_add_last_name - in function');

		if (!$this->input->is_ajax_request()) {
			// echo $this->output_json(['unauthorized']);
			exit;
		}

		$this->form_validation->set_rules(array($this->Users_model->get_insert_last_name_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Users: validate_add_last_name - failed to validate last name');
			$errors = array(
				'last_name' => form_error('last_name'),
			);
			echo json_encode($errors);
		}
	}

	public function validate_add_email() {
		log_message('debug', 'Users: validate_add_email - in function');

		if (!$this->input->is_ajax_request()) {
			// echo $this->output_json(['unauthorized']);
			exit;
		}

		$this->form_validation->set_rules(array($this->Users_model->get_insert_email_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Users: validate_add_email - failed to validate email');
			$errors = array(
				'email' => form_error('email')
			);
			echo json_encode($errors);
		}
	}

	public function validate_add_password() {
		log_message('debug', 'Users: validate_add_password - in function');

		if (!$this->input->is_ajax_request()) {
			// echo $this->output_json(['unauthorized']);
			exit;
		}

		$this->form_validation->set_rules(array($this->Users_model->get_insert_password_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Users: validate_add_password - failed to validate password');
			$errors = array(
				'password' => form_error('password')
			);
			echo json_encode($errors);
		}
	}

    public function edit() {
		log_message('debug', 'Users: edit - in function');
		if (!$this->input->is_ajax_request()) {
            // echo $this->output_json(['unauthorized']);
            exit;
        }

		if ($this->form_validation->run() == TRUE) {
			$user = array(
				'id' => $this->input->post('id'),
				'first_name' => $this->input->post('first_name'),
				'last_name' => $this->input->post('last_name'),
				'email' => $this->input->post('email'),
				'password' => $this->input->post('password')
			);

			if ($this->Users_model->update($user)) {
				echo json_encode("success");
			} else {
				echo json_encode("error");
			}


		} else {
			$errors = array(
                'first_name' => form_error('first_name'),
                'last_name' => form_error('last_name'),
				'email' => form_error('email'),
                'password' => form_error('password')
            );
			echo json_encode($errors);
		}
    }

	public function validate_edit_first_name() {
		log_message('debug', 'Users: validate_edit_first_name - in function');

		if (!$this->input->is_ajax_request()) {
			// echo $this->output_json(['unauthorized']);
			exit;
		}

		$this->form_validation->set_rules(array($this->Users_model->get_insert_first_name_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Users: validate_edit_first_name - failed to validate first name');
			$errors = array(
				'first_name' => form_error('first_name'),
			);
			echo json_encode($errors);
		}
	}

	public function validate_edit_last_name() {
		log_message('debug', 'Users: validate_edit_last_name - in function');

		if (!$this->input->is_ajax_request()) {
			// echo $this->output_json(['unauthorized']);
			exit;
		}

		$this->form_validation->set_rules(array($this->Users_model->get_insert_last_name_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Users: validate_edit_last_name - failed to validate last name');
			$errors = array(
				'last_name' => form_error('last_name'),
			);
			echo json_encode($errors);
		}
	}

	public function validate_edit_email() {
		log_message('debug', 'Users: validate_edit_email - in function');

		if (!$this->input->is_ajax_request()) {
			// echo $this->output_json(['unauthorized']);
			exit;
		}

		$this->form_validation->set_rules(array($this->Users_model->get_insert_email_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Users: validate_edit_email - failed to validate email');
			$errors = array(
				'email' => form_error('email'),
			);
			echo json_encode($errors);
		}
	}

	public function validate_edit_password() {
		log_message('debug', 'Users: validate_edit_password - in function');

		if (!$this->input->is_ajax_request()) {
			// echo $this->output_json(['unauthorized']);
			exit;
		}

		$this->form_validation->set_rules(array($this->Users_model->get_insert_password_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Users: validate_edit_password - failed to validate password');
			$errors = array(
				'password' => form_error('password'),
			);
			echo json_encode($errors);
		}
	}

    public function delete($id) {
		log_message('debug', 'Users: delete - in function');

        $this->Users_model->delete($id);
    }

	public function get_active() {
		log_message('debug', 'Users: get_active - in function');

		$active_users = $this->Users_model->get_active();
		$json_users = json_encode($active_users);
		echo $json_users;
	}

	function is_name_unique($name) {
		log_message('debug', 'Users: is_name_unique - in function');

		return $this->Users_model->is_name_unique($name);
	}

	function is_name_unique_not_different_from_current($name) {
		log_message('debug', 'Users: is_name_unique_not_different_from_current - in function');

		$id = $this->input->post('id');
		return $this->Users_model->is_name_unique_not_different_from_current($name, $id);
	}

	function id_exists($id) {
		log_message('debug', 'Users: id_exists - in function');

		return $this->Users_model->id_exists($id);
	}
}
