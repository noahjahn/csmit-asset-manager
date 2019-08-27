<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Asset_Types_model extends CI_Model {

    public function get_active_asset_types() {
        $this->db->select('name, rate');
        $this->db->from('asset_types');
        $this->db->where('is_active', TRUE);
        return $this->db->get();
    }

    /*
        $asset_type should be an array with two keys: name, rate
    */

    public function add_asset_type($asset_type) {
        // check if asset type name is unique (only check active)

        // if it's unique, add it

    }

    public function update_asset_type($id, $asset_type) {

    }

    public function delete_asset_type($id) {
        // check if asset type passed in exists and is active

        // if it is, set active to 0 (inactive) this is a soft delete

    }

}

?>
