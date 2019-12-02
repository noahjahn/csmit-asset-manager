<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Errors extends CI_Controller {

	public function __construct() {
		parent::__construct();
	}

	public function index() {

	}

    public function unauthorized() {
		log_message('debug', 'Errors: unauthorized - in function');

		$this->load->view('errors/custom/unauthorized');
    }

	public function forbidden() {
		log_message('debug', 'Errors: forbidden - in function');

		$this->load->view('errors/custom/forbidden');
	}

}

?>
