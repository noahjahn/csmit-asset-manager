<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class LoginPhotos extends CI_Controller {

	private $user_id;
	private $user_role_id;
	private $page;

	public function __construct() {
		parent::__construct();
        $this->load->model('LoginPhotos_model');
		$this->load->helper("database");
		$this->load->helper("general");
		$this->load->helper("authorization");
		$this->user_id = $this->session->userdata('id');
		$this->user_role_id = $this->session->userdata('id');
		$this->page = 'asset_groups';
		if ( ! $this->session->userdata('id')) { // if the user is not logged in
            redirect('unauthorized');
		}
		if ( ! is_authorized($this->user_role_id, $this->page)) {
			redirect('forbidden');
		}

		if ($this->uri->total_segments() > 1) {
			if ( ! $this->uri->segment(2) == 'get_active') {
				if ( ! has_write_access($this->user_role_id, $this->page)) {
					redirect('forbidden');
				}
			}
		}
        $this->login_photos_path = LOGIN_PHOTOS;
	}

	public function index() {

	}

    public function add() {
		log_message('debug', 'LoginPhotos: add - in function');
    }

    public function delete($id) {
		log_message('debug', 'LoginPhotos: delete - in function');

        $this->LoginPhotos_model->delete($id);
    }

	public function get_active() {
		log_message('debug', 'LoginPhotos: get_active - in function');

		$active_login_photos = $this->LoginPhotos_model->get_active();
		$json_login_photos = json_encode($active_login_photos);
		echo $json_login_photos;
	}
}
