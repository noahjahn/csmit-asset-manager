<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('Auth_model'); // used in many different functions, so load it in the constructor
		$this->load->model('Users_model'); // used in many different functions, so load it in the constructor
	}

	/*
		function index:
			* arguments:
				- Not applicable

			* description:
				- if a user is already logged in redirects them to assetmanager page
				- otherwise checks for a login request
				- if no login request, then loads the login page view
			* returns:
				- Not applicable
	*/

	public function index() { // start here
		log_message('debug', 'Auth: index - in function');

		if ($this->session->has_userdata('id')) { // Check if the user is logged in
			redirect('dashboard'); // maybe implement user's default page??
		} else { // send them to the login form
			$this->login_request(); // try a login request.. did the user submit the login form?
			$this->load_login(); // finish by loading the login page, assuming the login failed or was never requested
		}
	}

	/*
		function load_login:
			* arguments:
				- Not applicable

			* description:
				- cannot be directly accessed by the front-end
				- gets a login photo to send to the view
				- loads the login page
			* returns:
				- Not applicable
	*/

	private function load_login()	{
		log_message('debug', 'Auth: login - in function');
		// pick a random photo to send to the view
		if ($this->session->flashdata('login_photo_path')) {
			$view_data['login_photo'] = ($this->session->flashdata('login_photo_path'));
		} else {
			$view_data['login_photo'] = ($this->get_login_photo());
		}
		$this->load->view('public/login/index', $view_data);
	}

	/*
		function login_request:
			* arguments:
				- Not applicable

			* description:
				- cannot be directly accessed by the front-end
				- checks to see if a login request is made by checking if post data
				is set from the login form
				- if a login request is made, the input in the form is validated
				- if valid input is entered, check if the input matches what is
				stored in the system
				- if input matches what is in the database, set user session data
				and redirect the user to the dashboard (or their preffered homepage)

			* returns:
				- Not applicable
	*/

	private function login_request() {
		log_message('debug', 'Auth: login_request - in function');

		if ($this->input->post('login-submit')) { // if the login form was submitted
			$this->form_validation->set_rules($this->Auth_model->get_login_rules());
			if ($this->form_validation->run() == TRUE) { // if credentials pass our rules
				$email = $this->input->post('email'); // get email from login form
				$password = $this->input->post('password'); // get password from login form

				if ($this->can_login($password, $email)) {
					$id = $this->Users_model->get_id($email);
					if ($user_attributes = $this->Users_model->get_attributes($id)) {
						$user_data = array(
							'id' => $id,
							'role' => $user_attributes['role'],
							'email' => $user_attributes['email'],
							'first_name' => $user_attributes['first_name'],
							'last_name' => $user_attributes['last_name'],
							'token' => $encrypted_token = $this->generate_session_token() // set encrypted token in user session variable
						);

						log_message('debug', 'Auth: login_request - first_name='.$user_data['first_name'].' last_name='.$user_data['last_name']);

						if ($this->Users_model->set_session_token($user_data['id'], $encrypted_token)) { // set the token in the database
							if ($this->Users_model->set_last_login($user_data['id'])) { // set the last user login in the database
								$this->session->set_userdata($user_data);
								redirect('assetmanager'); // maybe implement user's default page?? it could just be stored as a user attribute
							} else {
								$this->session->set_flashdata('error', 'Failed to set last login');
								$this->session->sess_destroy();
							}
						} else {
							$this->session->set_flashdata('error', 'Failed to set token');
							$this->session->sess_destroy();
						}
					} else {
						log_message('debug', 'Auth: login_request - failed to get user data. id='.$id);
						$this->session->set_flashdata('error', 'Failed to get user data');
						$this->session->sess_destroy();
					}
				} else {
					$this->session->set_flashdata('error', 'Invalid username or password');
				}
			}
		}
	}

	/*
		function can_login:
			* arguments:
				- `$password`: expects plaintext password
				- `$email`: expects a valid email address

			* description:
				- cannot be directly accessed by the front-end
				- authenticates a user given a plaintext password and email address
				- the plaintext is first hashed before comparing the password stored
				in the database for the user with the given email address
				- after more than 5 failed login attempts, the system waits 5 seconds
				before continuing to slow ddos attacks

			* returns:
				- `TRUE`: if the user submitted a valid email in the system combined with
				the correct combined password
				- `FALSE`: if the user didn't submit an email address existing in the
				system OR if the email address password combination does not match
				what is stored in the database
	*/

	private function can_login($password, $email) {
		log_message('debug', 'Auth: can_login - in function');

		if ($this->Auth_model->is_valid_email($email)) {
			if (password_verify($password, $this->Auth_model->get_user_password($email))) {
				$ret = TRUE;
			} else {
				log_message('debug', 'Auth: can_login - an incorrect password was entered for the account '.$email.' '.$password);
				$ret = FALSE;
			}
		} else {
			log_message('debug', 'Auth: can_login - email '.$email.' could not be found in the system');
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

	/*
		function generate_session_token:
			* arguments:
				- Not applicable

			* description:
				- generate a session token and encode it

			* returns:
				- the encrypted token
	*/

	private function generate_session_token() {
		log_message('debug', 'Auth: generate_session_token - in function');
		$token = bin2hex(random_bytes(64)); // generate token
		return base64_encode($token); // encrypt token
	}

	/*
		function get_login_photo:
			* arguments:
				- Not applicable

			* description:
				- if login photos exist in the system, pick a random one from the database
				- otherwise set to the default image

			* returns:
				- the file path of the random image
	*/

	private function get_login_photo() {
		log_message('debug', 'Auth: get_login_photo - in function');
		$this->load->model('LoginPhotos_model');

		$login_photos = $this->LoginPhotos_model->get_active();
		if (($login_photo_count = count($login_photos)) > 0) {
			$photo_index = rand(0, $login_photo_count - 1); // get a random number between 1 and the number of photos stored in the database
			$login_photo_name = $this->LoginPhotos_model->get_name($login_photos[$photo_index]['id']); // get the photo path of the index number randomly generated
		} else {
			// always have a default image for when someone deletes all the images in the database
			$login_photo_name = "default.jpg";
		}
		$login_photo_path = LOGIN_PHOTOS . $login_photo_name;
		log_message('debug', 'Auth: get_login_photo - login_photo_path='.$login_photo_path);

		$this->session->set_flashdata('login_photo_path', $login_photo_path); // only reset this photo on a new request

		return $login_photo_path;
	}

	/*
		function logout:
			* arguments:
				- Not applicable

			* description:
				- destroys session data
				- send the user back to the login page

			* returns:
				- Not applicable
	*/

	public function logout() {
		log_message('debug', 'Auth: logout - in function');
		$this->session->sess_destroy();
		redirect(base_url());
		exit;
	}
}
