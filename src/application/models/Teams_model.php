<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Teams_model extends CI_Model {

    public function get_active_teams() {
        $this->db->select('id, name');
        $this->db->from('teams');
        $this->db->where('is_active', TRUE);
        return $this->db->get();
    }

    /*
        $team should be an array with one keys: name
    */

    public function add_team($team) {
        // check if team name is unique (only check active)

        // if it's unique, add it

    }

    public function update_team($id, $team) {

    }

    public function delete_team($id) {
        // check if team passed in exists and is active

        // if it is, set active to 0 (inactive) this is a soft delete

    }

}

?>
