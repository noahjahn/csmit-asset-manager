<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PasswordManager extends CI_Controller {

	public function __construct() {
		parent::__construct();

	}

	public function index() {
        if (! $this->session->userdata('email')) { // if the user is not logged in
            $this->load->view('errors/custom/access_denied'); // show a 401 unathorized error
        } else {
            $this->load->model('Common_model');

            $data['active_page'] = 'passwordmanager';
            $data['title'] = 'Password Manager';
            $data['main_content'] = 'private/password_manager/index';

            $this->load->view('private/reusable/page-template', $data);
        }
	}

}
