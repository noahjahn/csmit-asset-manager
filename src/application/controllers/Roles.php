<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Roles extends CI_Controller {

	private $user_id;
	private $user_role_id;
	private $page;

	public function __construct() {
		parent::__construct();
		$this->load->model('Roles_model');
		$this->load->helper("database");
		$this->load->helper("general");
		$this->load->helper("authorization");
		$this->user_id = $this->session->userdata('id');
		$this->user_role_id = $this->session->userdata('role');
		$this->page = 'roles';
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

	public function add() {
		log_message('debug', 'Roles: add - in function');

		if (!$this->input->is_ajax_request()) {
			redirect('forbidden');
        }

		$this->form_validation->set_rules($this->Roles_model->get_insert_rules());
		if ($this->form_validation->run() == TRUE) {
			$role = array(
				'name' => $this->input->post('name'),
				'dashboard' => $this->input->post('dashboard'),
				'asset_manager' => $this->input->post('asset_manager'),
				'reports' => $this->input->post('reports'),
				'asset_groups' => $this->input->post('asset_groups'),
				'users' => $this->input->post('users'),
				'roles' => $this->input->post('roles'),
				'login_photos' => $this->input->post('login_photos'),
				'last_modified_by' => $this->user_id,
				'last_modified_time' => date('Y-m-d H:i:s'),
				'created_by' => $this->user_id,
				'created_time' => date('Y-m-d H:i:s')
			);

			if ($this->Roles_model->insert($role)) {
				echo json_encode("success");
			} else {
				echo json_encode("failure");
			}
		} else {
			$errors = array(
                'name' => form_error('name'),
				'dashboard' => form_error('dashboard'),
				'asset_manager' => form_error('asset_manager'),
				'reports' => form_error('reports'),
				'asset_groups' => form_error('asset_groups'),
				'users' => form_error('users'),
				'roles' => form_error('roles'),
				'login_photos' => form_error('login_photos'),
            );

			echo json_encode($errors);
		}
    }

	public function validate_add_name() {
		log_message('debug', 'Roles: validate_add_name - in function');

		if (!$this->input->is_ajax_request()) {
			redirect('forbidden');
		}

		$this->form_validation->set_rules(array($this->Roles_model->get_insert_name_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Roles: validate_add_name - failed to validate name');
			$errors = array(
				'name' => form_error('name'),
			);
			echo json_encode($errors);
		}
	}

	public function edit() {
		log_message('debug', 'Roles: edit - in function');

		if (!$this->input->is_ajax_request()) {
			redirect('forbidden');
        }

		$this->form_validation->set_rules($this->Roles_model->get_update_rules());
		if ($this->form_validation->run() == TRUE) {
			$role = array(
				'id' => $this->input->post('id'),
				'name' => $this->input->post('name'),
				'dashboard' => $this->input->post('dashboard'),
				'asset_manager' => $this->input->post('asset_manager'),
				'reports' => $this->input->post('reports'),
				'asset_groups' => $this->input->post('asset_groups'),
				'users' => $this->input->post('users'),
				'roles' => $this->input->post('roles'),
				'login_photos' => $this->input->post('login_photos'),
				'last_modified_by' => $this->user_id,
				'last_modified_time' => date('Y-m-d H:i:s'),
			);

			if ($this->Roles_model->update($role)) {
				echo json_encode("success");
			} else {
				echo json_encode("failure");
			}
		} else {
			$errors = array(
                'name' => form_error('name'),
				'dashboard' => form_error('dashboard'),
				'asset_manager' => form_error('asset_manager'),
				'reports' => form_error('reports'),
				'asset_groups' => form_error('asset_groups'),
				'users' => form_error('users'),
				'roles' => form_error('roles'),
				'login_photos' => form_error('login_photos'),
            );

			echo json_encode($errors);
		}
    }

	public function validate_edit_name() {
		log_message('debug', 'Roles: validate_edit_name - in function');

		if (!$this->input->is_ajax_request()) {
			redirect('forbidden');
		}

		$this->form_validation->set_rules(array($this->Roles_model->get_update_name_rules()));
		if ($this->form_validation->run() == TRUE) {
			echo json_encode("success");
		} else {
			log_message('debug', 'Roles: validate_edit_name - failed to validate name');
			$errors = array(
				'name' => form_error('name'),
			);
			echo json_encode($errors);
		}
	}

	public function delete($id) {
		log_message('debug', 'Roles: delete - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
        }

        if ($this->Roles_model->delete($id)) {
			echo json_encode("success");
		} else {
			echo json_encode("failure");
		}
    }

    public function get_active() {
		log_message('debug', 'Roles: get_active - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
        }

		$active_roles = $this->Roles_model->get_active();
		$json_roles = json_encode($active_roles);
		echo $json_roles;
    }

	/*
		function get_page_access:
			* arguments:
				- `$page`: expects an string value of the page name

			* description:
				- passses the page argument to the model to see if it's a
				permissionable page, and if it is to get the number valued
				permission on that page.

			* returns:
				- `0`: if the user doesn't have access to the page
				- `4`: if the user has view access only to the page
				- `6`: if the user has write and view access to the page
				- `FALSE`: if the page isn't permissionable
	*/

	private function get_page_access($page) {
		log_message('debug', 'Roles: get_dashboard_access - in function. page='.$page);

		return $this->Roles_model->get_page_access($this->user_role_id, $page);
	}

	/*
		function valid_permission:
			* arguments:
				- `$permission_value`: expects an integer value: 6, 4, 0

			* description:
				- validates the value passed in for a permission is a value the
				system can understand

			* returns:
				- `TRUE`: if the value passed in is a valid permission value
				- `FALSE`: if the value passed in is an invalid permission value
	*/

	public function valid_permission($permission_value) {
		log_message('debug', 'Roles: valid_permission - in function. permission_value='.$permission_value);

		switch ($permission_value) {
            case R:
                return TRUE;
            case RW:
                return TRUE;
			case 0:
				return TRUE;
            default:
                return FALSE;
        }
	}

	/*
		function is_name_unique:
			* arguments:
				- `$name`: expects the plaintext name field from the form

			* description:
				- passes name to the model to check the roles table in the
				database to see if any other record has the same name

			* returns:
				- `TRUE`: if the value passed in is unique
				- `FALSE`: if the value passed in already exists in the roles
				table and is active
	*/

	public function is_name_unique($name) {
		log_message('debug', 'Roles: is_name_unique - in function. name='.$name);

		return $this->Roles_model->is_name_unique($name);
	}

	/*
		function is_name_unique_not_different_from_current:
			* arguments:
				- `$name`: expects the plaintext name field from the form

			* description:
				- passes name to the model to check the roles table in the
				database to see if any other record has the same name other than
				the current record the user is already trying to edit

			* returns:
				- `TRUE`: if the value passed in is unique
				- `FALSE`: if the value passed in already exists in the roles
				table, not as the current record, and is active
	*/

	public function is_name_unique_not_different_from_current($name) {
		log_message('debug', 'Roles: is_name_unique_not_different_from_current - in function');

		$id = $this->input->post('id');
		return $this->Roles_model->is_name_unique_not_different_from_current($name, $id);
	}

	/*
		function id_exists:
			* arguments:
				- `$id`: expects the id of a role record

			* description:
				- passes id to the model to check the roles table in the
				database to see if the id exists and is active

			* returns:
				- `TRUE`: if the value passed in exists
				- `FALSE`: if the value passed in doesn't not exist or is
				inactive
	*/

	public function id_exists($id) {
		log_message('debug', 'Roles: id_exists - in function');

		return $this->Roles_model->id_exists($id);
	}

}

?>
