<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class LoginPhotos extends CI_Controller {

	public function __construct() {
		parent::__construct();
		// check for user authorization
        $this->load->model('LoginPhotos_model');
		$this->load->helper("database");
		$this->load->helper("general");
		$this->user_id = $this->session->userdata('id');
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
