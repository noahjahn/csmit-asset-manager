<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class LoginPhotos extends CI_Controller {

	private $user_id;
	private $user_role_id;
	private $page;
	private $login_photos_path;

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

    public function add() {
		log_message('debug', 'LoginPhotos: add - in function');

		if (!empty($_FILES['file']['name'])) {
			// Set preference
			$config['upload_path'] = $this->login_photos_path;
			$config['allowed_types'] = 'jpg|jpeg|png|gif';
			$config['max_size'] = '24000'; // max_size in kb
			$config['max_width'] = 1920;
	        $config['max_height'] = 1080;
			$config['file_name'] = str_replace(' ', '_', $this->LoginPhotos_model->get_next_increment() . '-' . $_FILES['file']['name']);


			$this->load->library('upload', $config);

			if ($this->upload->do_upload('file')) {
				$upload_data = $this->upload->data();
				$login_photo = array(
					'name' => $upload_data['file_name'],
					'last_modified_by' => $this->user_id,
					'last_modified_time' => date('Y-m-d H:i:s'),
					'created_by' => $this->user_id,
					'created_time' => date('Y-m-d H:i:s')
				);
				$this->LoginPhotos_model->insert($login_photo);
				echo json_encode("success");
			} else {
				log_message('debug', $this->upload->display_errors());
			}
		}
    }

    public function delete($id) {
		log_message('debug', 'LoginPhotos: delete - in function');

		$file_pointer = $this->login_photos_path . $this->LoginPhotos_model->get_name($id);
		$this->LoginPhotos_model->delete($id);
		if (!unlink($file_pointer)) {
			log_message('debug', 'LoginPhotos: delete - file cannot be delete. file_pointer='.$file_pointer);
		} else {
    		log_message('debug', 'LoginPhotos: delete - file deleted. file_pointer='.$file_pointer);
		}
    }

	public function get_active() {
		log_message('debug', 'LoginPhotos: get_active - in function');

		$active_login_photos = $this->LoginPhotos_model->get_active();
		$json_login_photos = json_encode($active_login_photos);
		echo $json_login_photos;
	}
}
