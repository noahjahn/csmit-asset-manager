<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Settings_model extends CI_Model {

        public function get_teams() {
            $this->db->select('name');
            $this->db->from('teams');
            return $this->db->get();
        }

        public function add_team() {

        }

        public function get_manufacturers() {
            $this->db->select('name');
            $this->db->from('manufacturers');
            return $this->db->get();
        }

        public function add_manufacturer() {

        }

        public function get_models() {
            $this->db->select('models.name as name, models.manufacturer,' .
                'manufacturers.id, manufacturers.name as manufacturer');
            $this->db->from('models');
            $this->db->join('manufacturers', 'models.manufacturer = manufacturers.id');
            return $this->db->get();
        }

        public function add_model() {

        }
}

?>
