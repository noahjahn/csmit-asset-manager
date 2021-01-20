<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once APPPATH.'/libraries/exceptions/RecordDoesntExistException.php';

class RenewalTypes extends CI_Controller {

	private $user_id;
	private $user_role_id;

	public function __construct() {
		parent::__construct();
		// check for user authorization
		$this->load->model("RenewalTypes_model");
		$this->load->helper("database");
		$this->load->helper("general");
		$this->user_id = $this->session->userdata('id');
		$this->user_role_id = $this->session->userdata('role');
	}

  public function read($id = null) {
    try {
      if ($id) {
        $active_renewal_types = $this->RenewalTypes_model->get_by_id($id);
        if (count($active_renewal_types) == 0) {
          throw new RecordDoesntExistException('id', 'Record doesn\'t exist or is deleted');
        }
      } else {
        $active_renewal_types = $this->RenewalTypes_model->get_active();
      }
      $json_renewal_types = json_encode($active_renewal_types);
      echo $json_renewal_types;
    } catch (RecordDoesntExistException $record_doesnt_exist_exception) {
      $this->output->set_status_header($record_doesnt_exist_exception->getCode());
      echo json_encode(array(
        'error' => $record_doesnt_exist_exception->getMessage(),
      ));
    } catch (Exception $exception) {
      $this->output->set_status_header(500);
      echo json_encode(array(
        'error' => $exception->getMessage(),
      ));
    }
  }

  }







 ?>
