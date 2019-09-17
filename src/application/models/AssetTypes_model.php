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
        $this->db->where('is_deleted', FALSE);
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
        if (record_exists($id, $this->table) && record_is_deleted($id, $this->table)) {
            // if it is, update it

        } else {
            log_message('error', 'AssetTypes_model: delete_asset_type -
                failed, record '.$id.' doesn\'t exist or is inactive');
            return false;
        }
    }

    function delete_asset_type($id) {
        // check if asset type passed in exists and is not deleted
        if (record_exists($id, $this->table) && !(record_is_deleted($id, $this->table))) {
            // if it is, set is_deleted to 1, this is a soft delete
            if (set_last_modified_by($id, $this->user_id, $this->table)) {
                if (set_last_modified_time($id, $this->table)) {
                    $this->db->set('is_deleted', '1');
                    $this->db->where('id', $id);
                    return $this->db->update($this->table);
                } else {
                    log_message('error', 'AssetTypes_model: delete_asset_type -
                        failed to set last modified time. Record id: '.$id.'
                        Table: '.$this->table);
                    return false; // failed to set last modified time
                }
            } else {
                log_message('error', 'AssetTypes_model: delete_asset_type -
                    failed to set last modified by. Record id: '.$id.'
                    User id: '.$id.' Table: '.$this->table);
                return false;  // failed to set last modified by
            }
        } else {
            log_message('error', 'AssetTypes_model: delete_asset_type -
                failed, record '.$id.' doesn\'t exist or is deleted');
            return false; // failed, record doesn't exist or is deleted
        }
    }
}

?>
