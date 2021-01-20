<?php
require_once APPPATH.'/libraries/exceptions/RecordDoesntExistException.php';

class RenewalTypes_model extends CI_Model {

    private $table;
    private $user_id;
    private $fields;

    function __construct() {
        parent::__construct();
        $this->load->helper('database_helper');
        $this->table = 'renewal_types';
        $this->user_id = $this->session->userdata('id');
        $this->fields = array(
            'id' => 'id',
            'name' => 'name',
            'is_deleted' => 'is_deleted',
            'last_modified_by' => 'last_modified_by',
            'last_modified_time' => 'last_modified_time',
            'created_by' => 'created_by',
            'created_time' => 'created_time'
        );
    }
    public function get_active() {
        $this->db->select('*');
        $this->db->from('renewal_types');
        $this->db->where('renewal_types.is_deleted', FALSE);
        $renewal_types = $this->db->get()->result_array();

        return $renewal_types;
    }

    public function get_by_id($id){
      $this->db->select('*');
      $this->db->from('renewal_types');
      $this->db->where('renewal_types.id', $id);
      $this->db->where('renewal_types.is_deleted', FALSE);
      return $this->db->get()->result_array();
    }
}


 ?>
