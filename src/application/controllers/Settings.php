<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Settings extends CI_Controller {

	private $user_id;
	private $user_role_id;
	private $page;

	public function __construct() {
		parent::__construct();
		log_message('debug', 'Settings: construct - in function');

		$this->load->model('Roles_model');
		$this->user_id = $this->session->userdata('id');
		$this->user_role_id = $this->session->userdata('role');
		// if (empty($this->session->userdata('settings_active_tab'))) {
		// 	$tabs = $this->Roles_model->get_settings_access($this->user_role_id);
		// 	if ($tabs['asset_groups'] == R || $tabs['asset_groups'] == RW) {
		// 		$this->page = 'asset_groups';
		// 	} elseif ($tabs['users'] == R || $tabs['users'] == RW) {
		// 		$this->page = 'users';
		// 	} elseif ($tabs['roles'] == R || $tabs['roles'] == RW) {
		// 		$this->page = 'roles';
		// 	} elseif ($tabs['login_photos'] == R || $tabs['login_photos'] == RW) {
		// 		$this->page = 'login_photos';
		// 	}
		// } else {
		// 	$this->page = $this->session->userdata('settings_active_tab');
		// }
	}

	public function index() {
		log_message('debug', 'Settings: index - in function');

		// if (! $this->session->userdata('email')) { // if the user is not logged in
		// 	$this->load->view('errors/custom/access_denied'); // show a 403 unathorized error
		// } else {
			$view_data['active_page'] = 'settings';
			$view_data['title'] = 'Settings';
			$view_data['main_content'] = 'private/settings/index';
			$view_data['userdata'] = $this->session->all_userdata();
		//
		// 	switch ($this->Roles_model->get_page_access($this->user_role_id, $this->page)) {
		// 		case R:
		// 			$view_data['access'] = R;
		// 			$this->load->view('private/reusable/page-template', $view_data);
		// 			break;
		// 		case RW:
		// 			$view_data['access'] = RW;
					$this->load->view('private/reusable/page-template', $view_data);
		// 			break;
		// 		default:
		// 			$this->load->view('errors/custom/unauthorized');
		// 	}
		// }
	}

	public function set_active_tab($tab) {
		log_message('debug', 'Settings: set_active_tab - in function');

		$session_data = array(
			'settings_active_tab' => $tab
		);

		$this->session->set_userdata($session_data);
	}

	public function get_asset_groups_access() {
		log_message('debug', 'Settings: get_asset_groups_access - in function');

		$return = array(
			'asset_groups' => $this->Roles_model->get_page_access($this->user_role_id, 'asset_groups')
		);

		echo json_encode($return);
	}
}
