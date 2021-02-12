<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH.'/libraries/exceptions/RecordDoesntExistException.php';

class SoftwareAssets extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->helper("authorization");
		$this->load->model('SoftwareAssets_model');
		$this->user_id = $this->session->userdata('id') || 1;
		$this->user_role_id = $this->session->userdata('role');
		$this->page = 'software_assets';
		if (! $this->session->userdata('id')) { // if the user is not logged in
			redirect(base_url());
		}
		if ( ! is_authorized($this->user_role_id, $this->page)) {
			redirect('forbidden');
		}
	}

	public function index() {
		$this->load->model('RenewalTypes_model');
		$data['active_page'] = 'softwareassets';
		$data['title'] = 'Software Assets';
		$data['main_content'] = 'private/software_assets/index';
		$data['userdata'] = $this->session->all_userdata();
		$data['data']['data']['renewal_types'] = $this->RenewalTypes_model->get_active();
		$this->load->view('private/reusable/page-template', $data);
	}

	public function create() {
		log_message('debug', 'SoftwareAssets: create - in function');


		$this->output->set_content_type('application/json');
		$this->form_validation->set_rules($this->SoftwareAssets_model->get_insert_rules());
		if ($this->form_validation->run() == TRUE) {
			$software_asset = array(
				'name' => $this->input->post('name'),
				'username' => $this->input->post('username'),
				'password' => $this->input->post('password'),
				'login_url' => $this->input->post('login_url'),
				'notes' => $this->input->post('notes'),
				'renewal_date' => $this->input->post('renewal_date'),
				'renewal_type_id' => $this->input->post('renewal_type_id'),
				'cost' => $this->input->post('cost'),
				'representative_contact' => $this->input->post('representative_contact'),
				'license_keys' => $this->input->post('license_keys'),
				'owner' => $this->input->post('owner'),
				'last_modified_by' => $this->user_id,
				'last_modified_time' => date('Y-m-d H:i:s'),
				'created_by' => $this->user_id,
				'created_time' => date('Y-m-d H:i:s'),
			);

			log_message('debug', print_r($software_asset, TRUE));

			$software_asset['id'] = $this->SoftwareAssets_model->insert($software_asset);
			$this->output->set_status_header(201);
			echo json_encode($software_asset);
			log_message('debug', 'SoftwareAssets: create - successfully added software asset');
		} else {
			$errors = array(
				'name' => form_error('name'),
				'username' => form_error('usernme'),
				'password' => form_error('password'),
				'login_url' => form_error('login_url'),
				'notes' => form_error('notes'),
				'renewal_date' => form_error('renewal_date'),
				'renewal_type_id' => form_error('renewal_type_id'),
				'cost' => form_error('cost'),
				'representative_contact' => form_error('representative_contact'),
				'license_keys' => form_error('license_keys'),
				'owner' => form_error('owner')
            );
			$this->output->set_status_header(422);
			echo json_encode($errors);
		}
	}

	public function read($id = null) {
		log_message('debug', 'SoftwareAssets: read - in function');
		try {
			if ($id) {
				$active_software_assets = $this->SoftwareAssets_model->get_by_id($id);
				if (count($active_software_assets) == 0) {
					throw new RecordDoesntExistException('id', 'Record doesn\'t exist or is deleted');
				}
			} else {
				$active_software_assets = $this->SoftwareAssets_model->get_active();
			}
			$json_software_assets = json_encode($active_software_assets);
			echo $json_software_assets;
		} catch (RecordDoesntExistException $record_doesnt_exist_exception) {
			$this->output->set_status_header($record_doesnt_exist_exception->getCode());
			echo json_encode(array(
				'error' => $record_doesnt_exist_exception->getMessage(),
			));
		} catch (Exception $exception) {
			$this->output->set_status_header(500);
			echo json_encode(array(
				'error' => $exception->getMessage(),
			));
		}
	}
	public function update() {
		log_message('debug', 'SoftwareAssets: update - in function');

		$this->output->set_content_type('application/json');
		$this->form_validation->set_rules($this->SoftwareAssets_model->get_update_rules());
		if ($this->form_validation->run() == TRUE) {
			$software_asset = array();
			if ($this->input->post('id') !== null) {
				$software_asset['id'] = $this->input->post('id');
			}
			if ($this->input->post('name') !== null) {
				$software_asset['name'] = $this->input->post('name');
			}
			if ($this->input->post('username') !== null) {
				$software_asset['username'] = $this->input->post('username');
			}
			if ($this->input->post('password') !== null) {
				$software_asset['password'] = $this->input->post('password');
			}
			if ($this->input->post('login_url') !== null) {
				$software_asset['login_url'] = $this->input->post('login_url');
			}
			if ($this->input->post('notes') !== null) {
				$software_asset['notes'] = $this->input->post('notes');
			}
			if ($this->input->post('renewal_date') !== null) {
				$software_asset['renewal_date'] = $this->input->post('renewal_date');
			}
			if ($this->input->post('renewal_type_id') !== null) {
				$software_asset['renewal_type_id'] = $this->input->post('renewal_type_id');
			}
			if ($this->input->post('cost') !== null) {
				$software_asset['cost'] = $this->input->post('cost');
			}
			if ($this->input->post('representative_contact') !== null) {
				$software_asset['representative_contact'] = $this->input->post('representative_contact');
			}
			if ($this->input->post('license_keys') !== null) {
				$software_asset['license_keys'] = $this->input->post('license_keys');
			}
			if ($this->input->post('owner') !== null) {
				$software_asset['owner'] = $this->input->post('owner');
			}

			$software_asset['last_modified_by'] = $this->user_id;
			$software_asset['last_modified_time'] = date('Y-m-d H:i:s');

			try {
				$this->SoftwareAssets_model->update($software_asset);
				$this->output->set_status_header(200);
				echo json_encode($software_asset);
				log_message('debug', 'SoftwareAssets: update - successfully updated software asset');
			} catch (RecordDoesntExistException $record_doesnt_exist_exception) {
				$this->output->set_status_header($record_doesnt_exist_exception->getCode());
				echo json_encode(array(
					'error' => $record_doesnt_exist_exception->getMessage(),
				));
			} catch (Exception $exception) {
				$this->output->set_status_header(422);
				echo json_encode(array(
					'error' => $exception->getMessage(),
				));
			}
		} else {
			$errors = array(
				'id' => form_error('id'),
				'name' => form_error('name'),
				'username' => form_error('usernme'),
				'password' => form_error('password'),
				'login_url' => form_error('login_url'),
				'notes' => form_error('notes'),
				'renewal_date' => form_error('renewal_date'),
				'renewal_type_id' => form_error('renewal_type_id'),
				'cost' => form_error('cost'),
				'representative_contact' => form_error('representative_contact'),
				'license_keys' => form_error('license_keys'),
				'owner' => form_error('owner')
			);
			$this->output->set_status_header(422);
			echo json_encode($errors);
		}
	}

	public function id_exists($id) {
		if ($id) {
			$active_software_assets = $this->SoftwareAssets_model->get_by_id($id);
			if (count($active_software_assets) == 0) {
				return FALSE;
			}
			return TRUE;
		}
		return FALSE;
	}

	public function delete($id) {
		log_message('debug', 'SoftwareAssets: delete - in function');
		$this->output->set_content_type('application/json');

		try {
			$software_asset = $this->SoftwareAssets_model->delete($id);
			$this->output->set_status_header(200);
			echo json_encode($software_asset);
			log_message('debug', 'SoftwareAssets: delete - successfully updated software asset');
		} catch (RecordDoesntExistException $record_doesnt_exist_exception) {
			$this->output->set_status_header($record_doesnt_exist_exception->getCode());
			echo json_encode(array(
				'error' => $record_doesnt_exist_exception->getMessage(),
			));
		} catch (Exception $exception) {
			$this->output->set_status_header(500);
			echo json_encode(array(
				'error' => $exception->getMessage(),
			));
		}
	}
}
