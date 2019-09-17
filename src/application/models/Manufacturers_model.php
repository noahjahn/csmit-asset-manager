<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Manufacturers_model extends CI_Model {

    private $table;
    private $user_id;

    function __construct() {
        parent::__construct();
        $this->table = "manufacturers";
        $this->user_id = $this->session->userdata('id');
    }

    public function get_active_manufacturers() {
        $this->db->select('name, id');
        $this->db->from('manufacturers');
        $this->db->where('is_deleted', FALSE);
        return $this->db->get();
    }

    /*
        $manufacturer should be an array with one keys: name
    */

    public function add_manufacturer($manufacturer) {
        // check if manufacturer name is unique (only check active)

        // if it's unique, add it

    }

    public function update_manufacturer($id, $manufacturer) {

    }

    public function delete_manufacturer($id) {
        // check if manufacturer passed in exists and is not deleted
        if (record_exists($id, $this->table) && !(record_is_deleted($id, $this->table))) {
            // if it is, set deleted to 1, this is a soft delete
            if (set_last_modified_by($id, $this->user_id, $this->table)) {
                if (set_last_modified_time($id, $this->table)) {
                    $this->db->set('is_deleted', '1');
                    $this->db->where('id', $id);
                    return $this->db->update($this->table);
                } else {
                    log_message('error', 'Manufacturers_model: delete_manufacturer -
                        failed to set last modified time. Record id: '.$id.'
                        Table: '.$this->table);
                    return false; // failed to set last modified time
                }
            } else {
                log_message('error', 'Manufacturers_model: delete_manufacturer -
                    failed to set last modified by. Record id: '.$id.'
                    User id: '.$id.' Table: '.$this->table);
                return false;  // failed to set last modified by
            }
        } else {
            log_message('error', 'Manufacturers_model: delete_manufacturer -
                failed, record '.$id.' doesn\'t exist or is already deleted');
            return false; // failed, record doesn't exist or is deleted
        }
    }
}

?>
