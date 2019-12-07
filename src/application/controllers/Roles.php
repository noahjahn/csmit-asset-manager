<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Roles extends CI_Controller {

	private $user_id;
	private $user_role_id;
	private $page;

	public function __construct() {
		parent::__construct();
		$this->load->helper("database");
		$this->load->helper("general");
		$this->load->helper("authorization");
		$this->user_id = $this->session->userdata('id');
		$this->user_role_id = $this->session->userdata('id');
		$this->page = 'roles';
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
	}

    public function get_active() {
		log_message('debug', 'Roles: get_active - in function');

		if (!$this->input->is_ajax_request()) {
            redirect('forbidden');
        }

		$active_roles = $this->Roles_model->get_active();
		$json_roles = json_encode($active_roles);
		echo $json_roles;
    }

	private function get_page_access($page) {
		log_message('debug', 'Roles: get_dashboard_access - in function');

		return $this->Roles_model->get_page_access($this->user_role_id, $page);
	}

}

?>
