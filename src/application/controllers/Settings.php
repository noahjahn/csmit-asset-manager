<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Settings extends CI_Controller {

	public function __construct() {
		parent::__construct();

	}

	public function index() {
		if (! $this->session->userdata('email')) { // if the user is not logged in
			$this->load->view('errors/custom/access_denied'); // show a 401 unathorized error
		} else {
			$this->load->model('Settings_model');

			$data['active_page'] = 'settings';
			$data['title'] = 'Settings';
			$data['main_content'] = 'private/settings/index';
			// if ($this->session->isset($_SESSION['settings_page']) {
			//
			// 	switch ($_SESSION['settings_page']) {
			// 		case: 'asset_manager':
			// 			$data = asset_manager($data);
			// 			break;
			//
			// 		default:
			// 			$data = asset_manager($data);
			// 			break;
			// 	}
			// } else {
				$data = $this->asset_manager($data);
			// }

			$this->load->view('private/reusable/page-template', $data);
		}
	}

	public function asset_manager($data) {
		$data['data']['data']['asset_types'] = $this->Settings_model->get_asset_types();
		$data['data']['data']['teams'] = $this->Settings_model->get_teams();
		$data['data']['data']['manufacturers'] = $this->Settings_model->get_manufacturers();
		$data['data']['data']['models'] = $this->Settings_model->get_models();
		return $data;
	}

	public function users() {

	}

	public function permissions() {

	}

}
