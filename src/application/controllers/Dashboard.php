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
		
	    $data['active_page'] = 'dashboard';
	    $data['title'] = 'Dashboard';
		$data['main_content'] = 'private/dashboard/index';
		$data['data']['asset_types'] = json_encode($this->get_active_assets_with_total_count());
		$data['data']['month_forecast'] = $this->get_month_forecast();
		$data['userdata'] = $this->session->all_userdata();

	    $this->load->view('private/reusable/page-template', $data);
	}

	private function get_active_assets_with_total_count() {
		$this->load->model('AssetTypes_model');
		$this->load->model('AssetManager_model');
		$active_asset_types = $this->AssetTypes_model->get_active();
		$active_asset_types_with_count = array();
		foreach ($active_asset_types as $active_asset_type) {
			$active_asset_type_count = $this->AssetManager_model->get_count_by_asset_type($active_asset_type['name']);
			array_push($active_asset_types_with_count, array(
				'id' => $active_asset_type['id'],
				'name' => $active_asset_type['name'],
				'count' => $active_asset_type_count,
			));
		}
		return $active_asset_types_with_count;
	}

	private function get_count_by_models_internal($model) {
		log_message('debug', 'Dashboard: get_count_by_asset_type - in function. asset_type='.$model['name']);
		$this->load->model("AssetManager_model");

		$return = $this->AssetManager_model->get_count_by_model($model);
		return $return;
	}

	private function get_month_forecast() {
		log_message('debug', 'Dashboard: get_month_forecast - in function');
		$this->load->model("Models_model");
		$active_models = $this->Models_model->get_active();

		$total = 0;

		foreach ($active_models as $key => $value) {
			$count = $this->get_count_by_models_internal($value);
			$total = $total + ($count * $value['rate']);
			log_message('debug', 'count='.$count.' name='.$value['name']. ' rate='.$value['rate']);
		}

		return $total;

	}

}
