<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SoftwareAssets extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->helper("authorization");
		$this->load->model('SoftwareAssets_model');
		$this->user_id = $this->session->userdata('id');
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
		$data['active_page'] = 'softwareassets';
		$data['title'] = 'Software Assets';
		$data['main_content'] = 'private/software_assets/index';
		$data['userdata'] = $this->session->all_userdata();

		$this->load->view('private/reusable/page-template', $data);
	}

	public function get_active() {
		log_message('debug', 'SoftwareAssets: get_active - in function');

		$active_software_assets = $this->SoftwareAssets_model->get_active();
		$json_software_assets = json_encode($active_software_assets);
		echo $json_software_assets;
	}
}
