<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {

	private $page;

	public function __construct() {
		parent::__construct();
		$this->load->helper("authorization");
		$this->user_id = $this->session->userdata('id');
		$this->user_role_id = $this->session->userdata('id');
		$this->page = 'dashboard';
		if (! $this->session->userdata('id')) { // if the user is not logged in
            redirect('unauthorized');
		}
		if ( ! is_authorized($this->user_role_id, $this->page)) {
			redirect('forbidden');
		}

	}

	public function index() {

		$this->load->model('Common_model');

	    $data['active_page'] = 'dashboard';
	    $data['title'] = 'Dashboard';
	    $data['main_content'] = 'private/dashboard/index';
		$data['userdata'] = $this->session->all_userdata();

	    $this->load->view('private/reusable/page-template', $data);

	}

}
