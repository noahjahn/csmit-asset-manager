<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Common_model extends CI_Model {

    public function set_last_modified_by($table, $id, $last_modified_by) {
        $this->db->set('last_modified_by', $last_modified_by);
        $this->db->where('id', $id);
        return $this->db->update($table);
    }

    public function set_last_modified_time($table, $id) {
        $this->db->set('last_modified_time', date('Y-m-d h:i:s'));
        $this->db->where('id', $id);
        return $this->db->update($table);
    }

    public function set_created_by($table, $id, $created_by) {
        $this->db->set('created_by', $created_by);
        $this->db->where('id', $id);
        return $this->db->update($table);
    }

    public function set_created_by_time($table, $id) {
        $this->db->set('created_by_time', date('Y-m-d h:i:s'));
        $this->db->where('id', $id);
        return $this->db->update($table);
    }

}

?>
