<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Teams extends CI_Controller {

	public function __construct() {
		parent::__construct();
		// check for user authorization
        $this->load->model('Teams_model');
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

	public function index() {

	}

    public function add() {
		log_message('debug', 'Teams: add - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
            exit;
        }

		$this->form_validation->set_rules($this->Teams_model->get_insert_rules());
		if ($this->form_validation->run() == TRUE) {
			$name = $this->input->post('name');

			$this->Teams_model->insert($name);

			echo json_encode("success");

		} else {
			$errors = array(
                'name' => form_error('name')
            );
			echo json_encode($errors);
		}
    }

	public function validate_add_name() {
		log_message('debug', 'Teams: validate_add_name - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
            exit;
        }

		$this->form_validation->set_rules(array($this->Teams_model->get_insert_name_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Teams: validate_add_name - failed to validate name');
			$errors = array(
				'name' => form_error('name'),
			);
			echo json_encode($errors);
		}
	}

    public function edit() {
		log_message('debug', 'Teams: edit - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
            exit;
        }

		$this->form_validation->set_rules($this->Teams_model->get_update_rules());
		if ($this->form_validation->run() == TRUE) {
			$id = $this->input->post('id');
			$name = $this->input->post('name');

			$this->Teams_model->update($id, $name);

			echo json_encode("success");
		} else {
			log_message('debug', 'Teams: edit - failed to validate input');
			$errors = array(
				'id' => form_error('id'),
                'name' => form_error('name')
            );
			echo json_encode($errors);
		}
    }

	public function validate_edit_name() {
		log_message('debug', 'Teams: validate_edit_name - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
            exit;
        }

		$this->form_validation->set_rules(array($this->Teams_model->get_update_name_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Teams: validate_edit_name - failed to validate name');
			$errors = array(
                'name' => form_error('name'),
            );
			echo json_encode($errors);
		}
	}

    public function delete($id) {
		log_message('debug', 'Teams: delete - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
            exit;
        }

        $this->Teams_model->delete($id);
    }

	public function get_active() {
		log_message('debug', 'Teams: get_active - in function');

		$active_teams = $this->Teams_model->get_active();
		$json_teams = json_encode($active_teams);
		echo $json_teams;
	}

	function is_name_unique($name) {
		log_message('debug', 'Teams: is_name_unique - in function');

		return $this->Teams_model->is_name_unique($name);
	}

	function is_name_unique_not_different_from_current($name) {
		log_message('debug', 'Teams: is_name_unique_not_different_from_current - in function');

		$id = $this->input->post('id');
		return $this->Teams_model->is_name_unique_not_different_from_current($name, $id);
	}

	function id_exists($id) {
		log_message('debug', 'Teams: id_exists - in function');

		return $this->Teams_model->id_exists($id);
	}
}
