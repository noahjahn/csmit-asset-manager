<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inventories extends CI_Controller {

	public function __construct() {
		parent::__construct();

	}

	public function index() {
        if (! $this->session->userdata('email')) { // if the user is not logged in
            $this->load->view('errors/custom/access_denied'); // show a 401 unathorized error
        } else {
            $this->load->model('Common_model');

            $data['active_page'] = 'inventories';
            $data['title'] = 'Inventories';
            $data['main_content'] = 'private/inventories/index';

            $this->load->view('private/reusable/page-template', $data);
        }
	}

}
