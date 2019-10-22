<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Teams_model extends CI_Model {

    private $table;
    private $user_id;
    private $fields;

    function __construct() {
        parent::__construct();
        $this->table = "teams";
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

    function get_insert_rules() {
        log_message('debug', 'Teams_model: get_insert_rules - in function');

        $form_rules = array(
            $this->get_insert_name_rules()
        );
        return $form_rules;
    }

    function get_insert_name_rules() {
        log_message('debug', 'Teams_model: get_insert_name_rules - in function');
        $name_rules = array(
            'field' => $this->fields['name'],
            'label' => $this->fields['name'],
            'rules' => 'required|callback_is_name_unique|trim',
            'errors' => array(
                'is_name_unique' => 'The %s field must contain a unique value.'
            )
        );
        return $name_rules;
    }

    function get_update_rules() {
        log_message('debug', 'Teams_model: get_update_rules - in function');
        $form_rules = array (
            $this->get_update_id_rules(),
            $this->get_update_name_rules()
        );
        return $form_rules;
    }

    function get_update_id_rules() {
        log_message('debug', 'Teams_model: get_update_id_rules - in function');
        $id_rules = array(
            'field' => $this->fields['id'],
            'label' => $this->fields['id'],
            'rules' => 'required|callback_id_exists|trim',
            'errors' => array (
                'id_exists' => 'The %s field does not exist.'
            )
        );
        return $id_rules;
    }

    function get_update_name_rules() {
        log_message('debug', 'Teams_model: get_update_name_rules - in function');
        $name_rules = array(
            'field' => $this->fields['name'],
            'label' => $this->fields['name'],
            'rules' => 'required|callback_is_name_unique_not_different_from_current|trim',
            'errors' => array (
                'is_name_unique_not_different_from_current' => 'The %s field must contain a unique value.'
            )
        );
        return $name_rules;
    }

    function get_table_columns() {
        log_message('debug', 'Teams_model: get_table_columns - in function');
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

        log_message('debug', 'Teams_model: get_table_columns - columns: '.$return);
        return $return;
    }

    function get_name_by_id($id) {
        log_message('debug', 'Teams_model: get_name_by_id - in function');

        if (record_exists($id, $this->table) && !(record_is_deleted($id, $this->table))) {
            $this->db->select($this->fields['name']);
            $this->db->from($this->table);
            $this->db->where($this->fields['id'], $id);
            $this->db->limit(1);

            return $this->db->get()->result_array()['name'];

        } else {
            log_message('error', 'Teams_model: get_name_by_id - failed, record '.$id.' doesn\'t exist or is inactive');
            return FALSE;
        }
    }

    function get_id_by_name($name) {
        log_message('debug', 'Teams_model: get_id_by_name - in function');

        if ($this->is_name_unique($name)) {
            $this->db->select($this->fields['id']);
            $this->db->from($this->table);
            $this->db->where($this->fields['name'], $name);
            $this->db->limit(1);

            return $this->db->get()->result_array()[0][$this->fields['id']];

        } else {
            log_message('error', 'Teams_model: get_id_by_name - failed, name '.$name.' isn\'t unique');
            return FALSE;
        }
    }

    function get_active() {
        log_message('debug', 'Teams_model: get_active - in function');

        $this->db->select('id, name');
        $this->db->from($this->table);
        $this->db->where('is_deleted', FALSE);
        return $this->db->get()->result_array();
    }

    function insert($name) {
        log_message('debug', 'Teams_model: insert - in function');

        $data = array(
            'name' => $name,
            'last_modified_by' => $this->user_id,
            'created_by' => $this->user_id
        );

        if ($this->is_name_unique($name)) { // if it's unique, add it
            $this->db->insert($this->table, $data);
        } else {
            log_message('error', 'Teams_model: insert - failed, record '.$name.' isn\'t unique');
            return FALSE;
        }
    }

    function update($id, $name) {
        log_message('debug', 'Teams_model: update - in function');

        // check if team passed in exists and is active
        if (record_exists($id, $this->table) && !(record_is_deleted($id, $this->table))) {
            // if it is, update it
            $data = array(
                'name' => $name,
                'last_modified_by' => $this->user_id,
                'created_by' => $this->user_id
            );

            if ($this->is_name_unique_not_different_from_current($name, $id)) {
                $this->db->where('id', $id);
                $this->db->update($this->table, $data);
            } else {
                log_message('error', 'Teams_model: update - failed, record '.$name.' isn\'t unique');
                return FALSE;
            }
        } else {
            log_message('error', 'Teams_model: update - failed, record '.$id.' doesn\'t exist or is inactive');
            return FALSE;
        }
    }

    function delete($id) {
        log_message('debug', 'Teams_model: delete - in function');

        // check if team passed in exists and is not deleted
        if (record_exists($id, $this->table) && !(record_is_deleted($id, $this->table))) {
            // if it is, set is_deleted to 1, this is a soft delete
            if (set_last_modified_by($id, $this->user_id, $this->table)) {
                if (set_last_modified_time($id, $this->table)) {
                    $this->db->set('is_deleted', '1');
                    $this->db->where('id', $id);
                    return $this->db->update($this->table);
                } else {
                    log_message('error', 'Teams_model: delete - failed to set last modified time. Record id: '.$id.' Table: '.$this->table);
                    return FALSE; // failed to set last modified time
                }
            } else {
                log_message('error', 'Teams_model: delete - failed to set last modified by. Record id: '.$id.' User id: '.$id.' Table: '.$this->table);
                return FALSE;  // failed to set last modified by
            }
        } else {
            log_message('error', 'Teams_model: delete - failed, record '.$id.' doesn\'t exist or is deleted');
            return FALSE; // failed, record doesn't exist or is deleted
        }
    }

    function is_name_unique($name) {
        log_message('debug', 'Teams_model: is_name_unique - in function');

        $this->db->select($this->get_table_columns());
        $this->db->from($this->table);
        $this->db->where('name', $name);
        $this->db->where('is_deleted', 0);

        $query = $this->db->get();

        if ($query->num_rows() == 0) {
            return TRUE;
        } else {
            log_message('debug', 'Teams_model: is_name_unique - found more than one record with the same name '.$name);
            return FALSE;
        }
	}

    function is_name_unique_not_different_from_current($name, $id) {
        log_message('debug', 'Teams_model: is_name_unique_not_different_from_current - in function');

        $this->db->select($this->get_table_columns());
        $this->db->from($this->table);
        $this->db->where('name', $name);
        $this->db->where('is_deleted', 0);

        $query = $this->db->get();

        if ($query->num_rows() == 1) {
            if ($query->result_array()[0]['id'] == $id) {
                return TRUE;
            } else {
                log_message('error', 'Teams_model: is_name_unique_not_different_from_current - the name '.$name.' entered already exists');
                return FALSE;
            }
        } else if ($query->num_rows() == 0) {
            log_message('debug', 'Teams_model: is_name_unique_not_different_from_current - a new name has been entered: '.$name);
            return TRUE;
        } else {
            log_message('error', 'Teams_model: is_name_unique_not_different_from_current - found more than one record with the same name: '.$name);
            return FALSE;
        }
	}

    function id_exists($id) {
        log_message('debug', 'Teams_model: record_exists - in function');
        return record_exists($id, $this->table);
    }
}

?>
