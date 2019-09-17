<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Models_model extends CI_Model {

        private $table;
        private $user_id;

        function __construct() {
            parent::__construct();
            $this->table = "models";
            $this->user_id = $this->session->userdata('id');
        }

        public function get_active_models() {
            $this->db->select('models.id as id, models.name as name, models.manufacturer, '.
                'manufacturers.id as manufacturersid, manufacturers.name as manufacturer');
            $this->db->from('models');
            $this->db->join('manufacturers', 'models.manufacturer = manufacturers.id');
            $this->db->where('models.is_deleted', FALSE);
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

        public function delete_model($id) {
            // check if model passed in exists and is not deleted
            if (record_exists($id, $this->table) && !(record_is_deleted($id, $this->table))) {
                // if it is, set deleted to 1, this is a soft delete
                if (set_last_modified_by($id, $this->user_id, $this->table)) {
                    if (set_last_modified_time($id, $this->table)) {
                        $this->db->set('is_deleted', '1');
                        $this->db->where('id', $id);
                        return $this->db->update($this->table);
                    } else {
                        log_message('error', 'Models_model: delete_model -
                            failed to set last modified time. Record id: '.$id.'
                            Table: '.$this->table);
                        return false; // failed to set last modified time
                    }
                } else {
                    log_message('error', 'Models_model: delete_model -
                        failed to set last modified by. Record id: '.$id.'
                        User id: '.$id.' Table: '.$this->table);
                    return false;  // failed to set last modified by
                }
            } else {
                log_message('error', 'Models_model: delete_model -
                    failed, record '.$id.' doesn\'t exist or is already deleted');
                return false; // failed, record doesn't exist or is deleted
            }
        }
}

?>
