<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Models_model extends CI_Model {

        public function get_active_models() {
            $this->db->select('models.id as id, models.name as name, models.manufacturer,' .
                'manufacturers.id, manufacturers.name as manufacturer');
            $this->db->from('models');
            $this->db->where('models.is_deleted', TRUE);
            $this->db->join('manufacturers', 'models.manufacturer = manufacturers.id');
            return $this->db->get();
        }

        /*
            $model should be an array with two keys: name, manufacturer
        */

        public function add_model($model) {
            // check if model name is unique (only check active)

            // if it's unique, add it
        }

        public function update_model($id, $model) {

        }

        public function delete_model() {
            // check if model passed in exists and is active

            // if it is, set active to 0 (inactive) this is a soft delete

        }

}

?>
