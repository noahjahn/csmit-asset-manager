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
		$data['data']['models_per_team'] = json_encode($this->get_active_assets_by_team());
		$data['data']['month_forecast'] = $this->get_month_forecast();
		$data['userdata'] = $this->session->all_userdata();
	  $this->load->view('private/reusable/page-template', $data);
		log_message('debug', json_encode($this->get_active_assets_by_team()));
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
	private function get_active_assets_by_team() {
		log_message('debug', 'get_active_assets_by_team - in function');
		$this->load->model('Models_model');
		$this->load->model('Teams_model');
		$this->load->model('AssetManager_model');
		$active_Models = $this->Models_model->get_active();
		$active_Teams = $this->Models_model->get_active();
		$active_models_by_team_with_count = array();
		//return $active_models_by_team_with_count;
		$query_test = $this->AssetManager_model->get_count_by_model_per_team();
	/*	foreach ($active_Teams as $active_team) {
			array_push($active_models_by_team_with_count, array(
				'team_name' => $active_team['name']
			));
			foreach($active_Models as $active_model){
			//$active_models_count = $this->AssetManager_model->get_count_by_model_per_team($active_team['name'], $active_model['name']);
			array_push($active_models_by_team_with_count['team_name'], array(
				'id' => $active_model['id'],
				'name' => $active_model['name'],
				'count' => $this->AssetManager_model->get_count_by_model_per_team($active_team['name'], $active_model['name']),
			));*/

	/*	array_push($active_models_by_team_with_count, array(
			'team_name' => $active_team['name'];
		));
		}
		return $active_models_by_team_with_count;
		*/

	//return $active_models_by_team_with_count;
	return $query_test;
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
	private function get_teams() {
		log_message('debug', 'Dashboard: get_month_forecast - in function');
		$this->load->model("Teams_model");
		$active_teams = $this->Teams_model->get_active();
		return $active_teams;
	}

}
