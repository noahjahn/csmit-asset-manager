<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Manufacturers extends CI_Controller {

	private $user_id;
	private $user_role_id;
	private $page;

	public function __construct() {
		parent::__construct();
        $this->load->model('Manufacturers_model');
		$this->load->model('Models_model');
		$this->load->helper("database");
		$this->load->helper("general");
		$this->load->helper("authorization");
		$this->user_id = $this->session->userdata('id');
		$this->user_role_id = $this->session->userdata('id');
		$this->page = 'asset_groups';
		if ( ! $this->session->userdata('id')) { // if the user is not logged in
            redirect('unauthorized');
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
		log_message('debug', 'Manufacturers: add - in function');

		if (!$this->input->is_ajax_request()) {
            // echo $this->output_json(['unauthorized']);
            exit;
        }
		$this->form_validation->set_rules($this->Manufacturers_model->get_insert_rules());
		if ($this->form_validation->run() == TRUE) {
			$name = $this->input->post('name');

			$this->Manufacturers_model->insert($name);

			echo json_encode("success");

		} else {
			$errors = array(
                'name' => form_error('name')
            );
			echo json_encode($errors);
		}
    }

	public function validate_add_name() {
		log_message('debug', 'Manufacturers: validate_add_name - in function');

		if (!$this->input->is_ajax_request()) {
			// echo $this->output_json(['unauthorized']);
			exit;
		}

		$this->form_validation->set_rules(array($this->Manufacturers_model->get_insert_name_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Manufacturers: validate_add_name - failed to validate name');
			$errors = array(
				'name' => form_error('name'),
			);
			echo json_encode($errors);
		}
	}

    public function edit() {
		log_message('debug', 'Manufacturers: edit - in function');
		if (!$this->input->is_ajax_request()) {
            // echo $this->output_json(['unauthorized']);
            exit;
        }

		$this->form_validation->set_rules($this->Manufacturers_model->get_update_rules());
		if ($this->form_validation->run() == TRUE) {
			$id = $this->input->post('id');
			$name = $this->input->post('name');

			$this->Manufacturers_model->update($id, $name);

			echo json_encode("success");
		} else {
			log_message('debug', 'Manufacturers: edit - failed to validate input');
			$errors = array(
				'id' => form_error('id'),
                'name' => form_error('name')
            );
			$test = json_encode($errors);
			log_message('debug', 'Manufacturers: edit - failed to validate input errors= '.$test);

			echo json_encode($errors);
		}
    }

	public function validate_edit_name() {
		log_message('debug', 'Manufacturers: validate_edit_name - in function');

		if (!$this->input->is_ajax_request()) {
            // echo $this->output_json(['unauthorized']);
            exit;
        }

		$this->form_validation->set_rules(array($this->Manufacturers_model->get_update_name_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Manufacturers: validate_edit_name - failed to validate name');
			$errors = array(
                'name' => form_error('name')
            );
			echo json_encode($errors);
		}
	}

    public function delete($id) {
		log_message('debug', 'Manufacturers: delete - in function');

		if ($this->has_model($id)) {
			log_message('debug', 'Manufacturers: delete - can\'t delete this manufacturer='.$id.', it has at least one model tied to it');
			$errors = array(
				'id' => '<p>The manufacturer has at least one model linked to it. Please remove the model(s) before deleting this manufacturer.</p>'
			);
			echo json_encode($errors);
		} else {
			$this->Manufacturers_model->delete($id);
			echo json_encode("success");
		}
    }

	public function get_active() {
		log_message('debug', 'Manufacturers: get_active - in function');

		$active_manufacturers = $this->Manufacturers_model->get_active();
		$json_manufacturers = json_encode($active_manufacturers);
		echo $json_manufacturers;
	}

	function is_name_unique($name) {
		log_message('debug', 'Manufacturers: is_name_unique - in function');

		return $this->Manufacturers_model->is_name_unique($name);
	}

	function is_name_unique_not_different_from_current($name) {
		log_message('debug', 'Manufacturers: is_name_unique_not_different_from_current - in function');

		$id = $this->input->post('id');
		return $this->Manufacturers_model->is_name_unique_not_different_from_current($name, $id);
	}

	function id_exists($id) {
		log_message('debug', 'Manufacturers: id_exists - in function');

		return $this->Manufacturers_model->id_exists($id);
	}

	function has_model($id) {
		log_message('debug', 'Manufacturers: has_model - in function');

		if ($this->Models_model->get_manufacturer_count($id) > 0) {
			return TRUE;
		} else {
			return FALSE;
		}
	}
}
