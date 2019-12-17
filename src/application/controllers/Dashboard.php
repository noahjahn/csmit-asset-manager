<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {

	private $user_id;
	private $user_role_id;
	private $page;

	public function __construct() {
		parent::__construct();
		$this->load->helper("authorization");
		$this->user_id = $this->session->userdata('id');
		$this->user_role_id = $this->session->userdata('role');
		$this->page = 'dashboard';
		if (! $this->session->userdata('id')) { // if the user is not logged in
            redirect(base_url());
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

	public function get_count_by_asset_type($asset_type) {
		log_message('debug', 'Dashboard: get_count_by_asset_type - in function. asset_type='.$asset_type);
		$this->load->model("AssetManager_model");

		$return = $this->AssetManager_model->get_count_by_asset_type($asset_type);
		echo $return;
	}

	public function get_count_by_asset_type_internal($asset_type) {
		log_message('debug', 'Dashboard: get_count_by_asset_type - in function. asset_type='.$asset_type);
		$this->load->model("AssetManager_model");

		$return = $this->AssetManager_model->get_count_by_asset_type($asset_type);
		return $return;
	}

	public function get_month_forecast() {
		log_message('debug', 'Dashboard: get_month_forecast - in function');
		$this->load->model("AssetTypes_model");
		$active_asset_types = $this->AssetTypes_model->get_active();

		$total = 0;

		foreach ($active_asset_types as $key => $value) {
			$count = $this->get_count_by_asset_type_internal($value['name']);
			$total = $total + ($count * $value['rate']);
			log_message('debug', 'count='.$count.' name='.$value['name']. ' rate='.$value['rate']);
		}

		echo $total;

	}

}
