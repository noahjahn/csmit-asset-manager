<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Reports extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->helper("authorization");
		$this->user_id = $this->session->userdata('id');
		$this->user_role_id = $this->session->userdata('id');
		$this->page = 'reports';
		if (! $this->session->userdata('id')) { // if the user is not logged in
            redirect('unauthorized');
		}
		if ( ! is_authorized($this->user_role_id, $this->page)) {
			redirect('forbidden');
		}
	}

	public function index() {
        if (! $this->session->userdata('email')) { // if the user is not logged in
            $this->load->view('errors/custom/access_denied'); // show a 401 unathorized error
        } else {
            $this->load->model('Common_model');

            $data['active_page'] = 'reports';
            $data['title'] = 'Reports';
            $data['main_content'] = 'private/reports/index';
			$data['userdata'] = $this->session->all_userdata();

            $this->load->view('private/reusable/page-template', $data);
        }
	}

}
