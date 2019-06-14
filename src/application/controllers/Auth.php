<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('Auth_model'); // used in many different functions, so load it in the constructor
		$this->config->set_item('base_url', getenv('BASE_URL'));
	}

	public function index() { // start here

		if ($this->session->has_userdata('email')) { // Check if the user is logged in
			redirect('assetmanager'); // maybe implement user's default page??
		} else { // send them to the login form
			$this->login_request(); // try a login request.. did the user submit the login form?
			$this->login(); // finish by loading the login page, assuming the login failed or was never requested
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
			$this->form_validation->set_rules($this->Auth_model->get_login_rules());
			if ($this->form_validation->run() == TRUE) { // if credentials pass our rules
				$email = $this->input->post('login_email'); // get email from login form
				$password = $this->input->post('login_password'); // get password from login form
				if ($this->can_login($password, $email)) {
					$this->session->set_userdata('email', $email);
					redirect('assetmanager'); // maybe implement user's default page??
				} else {
					$this->session->set_flashdata('error', 'Invalid username or password');
				}
			}
		}
	}

	public function can_login($password, $email) {
		// $this->Auth_model->set_user_password($email, $password);
		if ($this->Auth_model->is_valid_email($email)) {
			if (password_verify($password, $this->Auth_model->get_user_password($email))) {
				$ret = TRUE;
			} else {
				$ret = FALSE;
			}
		} else {
			$ret = FALSE;
		}

		if (! $ret) { // if the user failed to login
			if ($this->session->userdata('failed_login_attempts') > 5) { // check how many times the user failed
				sleep (5); // wait to slow ddos attacks - (distributed denial-of-service attacks)
			}
			$failed_attempts = strval(intval($this->session->userdata('failed_login_attempts')) + 1);
			$this->session->set_userdata('failed_login_attempts', $failed_attempts);
		} else {
			$this->session->unset_userdata('failed_login_attempts'); // if the user successfully logged in, unset this data
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

		$this->session->set_flashdata('login_photo_path', $login_photo_path); // only reset this photo on a new request

		return $login_photo_path;
	}

	public function logout() {
		$this->session->sess_destroy();
		redirect(base_url());
		exit;
	}
}
