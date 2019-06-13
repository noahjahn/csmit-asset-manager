<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('Auth_model');
	}

	public function index() { // start here
		if ($this->session->userdata('email')) { // Check if the user is logged in
			$this->load->view('private/asset_manager/index');
		} else { // send them to the login form
			$this->login_request();
			$this->login();
		}
	}

	public function login()	{
		// pick a random photo to send to the view
		if ($this->session->flashdata('login_photo_path')) {
			$data['login_photo'] = (LOGIN_PHOTOS . $this->session->flashdata('login_photo_path'));
		} else {
			$data['login_photo'] = (LOGIN_PHOTOS . $this->get_login_photo());
		}
		$this->load->view('public/login/index', $data);
	}

	public function login_request() {
		if ($this->input->post('login-submit')) {
			$form_rules = array (
				array (
					'field' => 'login_email',
					'label' => 'Email',
					'rules' => 'required|valid_email|trim'
				),
				array (
					'field' => 'login_password',
					'label' => 'Password',
					'rules' => 'required|trim'
				)
			);
			$this->form_validation->set_rules($form_rules);
			if ($this->form_validation->run() == TRUE) {
				// if ($this->input->post('remember')) {
				// 	// email and password in cookie
				// }
				$email = $this->input->post('login_email');
				$password = $this->input->post('login_password');

				if ($this->can_login($password, $email)) {
					//$this->session->set_flashdata($this->Auth_model->get_user_attributes($email));
					redirect('assetmanager');
				} else {
					$this->session->set_flashdata('error', 'Invalid username or password');
					$this->session->flashdata('error');
					//redirect($this->input->server('HTTP_REFERER'));
				}
			}
		}
	}

	public function can_login($password, $email) {
		if ($this->Auth_model->is_valid_email($email)) {
			if (password_verify($password, $this->Auth_model->get_user_password($email))) {
				$ret = TRUE;
			} else {
				sleep (5); // wait to slow ddos attacks
				$ret = FALSE;
			}
		} else {
			$ret = FALSE;
		}

		return $ret;
	}

	public function get_login_photo() {
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

		$this->session->set_flashdata('login_photo_path', $login_photo_path);

		return $login_photo_path;
	}
}
