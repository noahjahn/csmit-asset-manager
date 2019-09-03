<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Manufacturers_model extends CI_Model {

    public function get_active_manufacturers() {
        $this->db->select('name, id');
        $this->db->from('manufacturers');
        $this->db->where('is_deleted', TRUE);
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
        // check if manufacturer passed in exists and is active

        // if it is, set active to 0 (inactive) this is a soft delete

    }

}

?>
