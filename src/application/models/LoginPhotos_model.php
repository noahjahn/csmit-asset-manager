<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class LoginPhotos_model extends CI_Model {

    private $table;
    private $user_id;
    private $fields;

    function __construct() {
        parent::__construct();
        $this->table = "login_photos";
        $this->user_id = $this->session->userdata('id');
        $this->fields = array(
            'id' => 'id',
            'name' => 'name',
            'is_deleted' => 'is_deleted',
            'last_modified_by' => 'last_modified_by',
            'last_modified_time' => 'last_modified_time',
            'created_by' => 'created_by',
            'created_time' => 'created_time'
        );
    }

    function get_next_increment() {
        log_message('debug', 'LoginPhotos_model: get_next_increment - in function');

        $query = $this->db->query('SHOW TABLE STATUS LIKE \''. $this->table . '\'');
        return $query->result_array()[0]['Auto_increment'];
    }

    function get_table_columns() {
        log_message('debug', 'LoginPhotos_model: get_table_columns - in function');
        $return = '';
        $number_of_fields = count($this->fields);
        $i = 0;
        foreach ($this->fields as $field => $value) {
            if ($i == $number_of_fields - 1) {
                $return .= $this->fields[$field];
            } else {
                $return .= $this->fields[$field].', ';
            }
            $i++;
        }

        log_message('debug', 'LoginPhotos_model: get_table_columns - columns: '.$return);
        return $return;
    }

    function get_name($id) {
        log_message('debug', 'LoginPhotos_model: get_name - in function');

        if ($this->id_exists($id)) {
            $this->db->select('name');
            $this->db->from($this->table);
            $this->db->where('id', $id);
            $this->db->where('is_deleted', FALSE);
            return $this->db->get()->result_array()[0]['name'];
        } else {
            return FALSE;
        }
    }

    function get_active() {
        log_message('debug', 'LoginPhotos_model: get_active - in function');

        $this->db->select($this->get_table_columns());
        $this->db->from($this->table);
        $this->db->where('is_deleted', FALSE);
        return $this->db->get()->result_array();
    }

    function insert($login_photo) {
        log_message('debug', 'LoginPhotos_model: insert - in function');

        $this->db->insert($this->table, $login_photo);
        return TRUE;
    }

    function delete($id) {
        log_message('debug', 'LoginPhotos_model: delete - in function');

        // check if user passed in exists and is not deleted
        if (record_exists($id, $this->table) && !(record_is_deleted($id, $this->table))) {
            // if it is, set is_deleted to 1, this is a soft delete
            if (set_last_modified_by($id, $this->user_id, $this->table)) {
                if (set_last_modified_time($id, $this->table)) {
                    $this->db->set('is_deleted', '1');
                    $this->db->where('id', $id);
                    return $this->db->update($this->table);
                } else {
                    log_message('error', 'LoginPhotos_model: delete - failed to set last modified time. Record id: '.$id.' Table: '.$this->table);
                    return FALSE; // failed to set last modified time
                }
            } else {
                log_message('error', 'LoginPhotos_model: delete - failed to set last modified by. Record id: '.$id.' LoginPhoto id: '.$id.' Table: '.$this->table);
                return FALSE;  // failed to set last modified by
            }
        } else {
            log_message('error', 'LoginPhotos_model: delete - failed, record '.$id.' doesn\'t exist or is deleted');
            return FALSE; // failed, record doesn't exist or is deleted
        }
    }

    function id_exists($id) {
        log_message('debug', 'LoginPhotos_model: record_exists - in function');
        return record_exists($id, $this->table);
    }
}

?>
