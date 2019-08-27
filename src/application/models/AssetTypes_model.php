<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AssetTypes_model extends CI_Model {

    private $table;
    private $user_id;

    function __construct() {
        parent::__construct();
        $this->table = "asset_types";
        $this->user_id = $this->session->userdata('id');
    }

    public function get_active_asset_types() {
        $this->db->select('id, name, rate');
        $this->db->from($this->table);
        $this->db->where('is_active', TRUE);
        return $this->db->get();
    }

    /*
        $asset_type should be an array with two keys: name, rate
    */

    public function add_asset_type($asset_type) {

        // if it's unique, add it

    }

    public function update_asset_type($id, $asset_type) {
        // check if asset type passed in exists and is active
        if (exists($id) && is_active($id)) {
            // if it is, update it

        } else {
            return false;
        }
    }

    function delete_asset_type($id) {
        // check if asset type passed in exists and is active
        if (record_exists($id, $this->table) && record_is_active($id, $this->table)) {
            // if it is, set active to 0 (inactive) this is a soft delete
            set_last_modified_by($id, $this->table, $this->user_id);
            set_last_modified_time($id, $this->table);
            $this->db->set('is_active', '0');
            $this->db->where('id', $id);
            return $this->db->update($this->table);
        } else {
            return false;
        }
    }
}

?>
