<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migrations_model extends CI_Model {

    private $table;
    private $user_id;
    private $fields;

    function __construct() {
        parent::__construct();
        $this->table = "migrations";
        $this->fields = array(
            'version' => 'version',
        );
    }
    
    function get_version() {
        log_message('debug', 'Migrations_model: get_version - in function');

        $this->db->select($this->fields['version']);
        $this->db->from($this->table);
        $this->db->limit(1);

        return $this->db->get()->result_array()[0]['version'];
    }
    
}

?>
