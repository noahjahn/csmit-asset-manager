<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Settings extends CI_Controller {

	public function __construct() {
		parent::__construct();

	}

	public function index() {
		if (! $this->session->userdata('email')) {
			$this->load->view('errors/custom/access_denied');
		} else {
			$data['active_page'] = 'settings';
			$this->load->view('private/settings/index', $data);
		}
	}

	public function asset_manager() {

	}

	public function users() {

	}

	public function permissions() {

	}

}
