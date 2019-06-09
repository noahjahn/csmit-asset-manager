<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends CI_Controller {

	public function __construct() {
		parent::__construct();

	}

	public function index() {
		// default page.

		// if ($this->session->userdata('username')) { Check if the user is logged in

		// } else { // send them to the login form
			$this->login();

	}

	public function login()	{
		// pick a random photo to send to the view
		$data['login_photo'] = (LOGIN_PHOTOS . $this->getLoginPhoto());

		$this->load->view('public/login/index', $data);
	}

	public function getLoginPhoto() {
		$this->load->model('Auth_model');

		// get number of photos currently stored in the database
		$login_photo_count = $this->Auth_model->count_login_photos();

		if ($login_photo_count > 0) {
			// get a random number between 1 and the number of photos stored in the database
			$photo_index = rand(1,$login_photo_count);
			// get the photo path of the index number randomly generated
			$login_photo_path = $this->Auth_model->get_login_photo($photo_index);
		} else {
			// always have a default image for when someone deletes all the images in the database
			$login_photo_path = "default.jpg";
		}

		return $login_photo_path;
	}
}
