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

    function get_add_rules() {
        $form_rules = array (
            array (
                'field' => 'name',
                'label' => 'name',
                'rules' => 'required|callback_is_name_unique|trim',
                'errors' => array (
                    'is_name_unique' => 'The %s field must contain a unique value.'
                )
            ),
            array (
                'field' => 'rate',
                'label' => 'rate',
                'rules' => 'required|numeric|trim'
            )
        );

        return $form_rules;
    }

    function get_update_rules() {
        $form_rules = array (
            array (
                'field' => 'id',
                'label' => 'id',
                'rules' => 'required|callback_record_exists['.$this->table.']|trim',
                'errors' => array (
                    'is_name_unique' => 'The %s field must contain a unique value.'
                )
            ),
            array (
                'field' => 'name',
                'label' => 'name',
                'rules' => 'required|callback_is_name_unique|trim',
                'errors' => array (
                    'is_name_unique' => 'The %s field must contain a unique value.'
                )
            ),
            array (
                'field' => 'rate',
                'label' => 'rate',
                'rules' => 'required|numeric|trim'
            )
        );

        return $form_rules;
    }

    function get_table_columns() {
        return ('id, name, rate, is_deleted, last_modified_by, last_modified_time, created_by, created_time');
    }

    function get_active() {
        $this->db->select('id, name, rate');
        $this->db->from($this->table);
        $this->db->where('is_deleted', FALSE);
        return $this->db->get();
    }

    /*
        $asset_type should be an array with two keys: name, rate
    */

    function add($name, $rate) {
        $data = array(
            'name' => $name,
            'rate' => $rate,
            'last_modified_by' => $this->user_id,
            'created_by' => $this->user_id
        );

        $this->db->insert($this->table, $data);


        // if it's unique, add it

    }

    function update($id, $asset_type) {
        // check if asset type passed in exists and is active
        if (record_exists($id, $this->table) && record_is_deleted($id, $this->table)) {
            // if it is, update it

        } else {
            log_message('error', 'AssetTypes_model: delete -
                failed, record '.$id.' doesn\'t exist or is inactive');
            return FALSE;
        }
    }

    function delete($id) {
        // check if asset type passed in exists and is not deleted
        if (record_exists($id, $this->table) && !(record_is_deleted($id, $this->table))) {
            // if it is, set is_deleted to 1, this is a soft delete
            if (set_last_modified_by($id, $this->user_id, $this->table)) {
                if (set_last_modified_time($id, $this->table)) {
                    $this->db->set('is_deleted', '1');
                    $this->db->where('id', $id);
                    return $this->db->update($this->table);
                } else {
                    log_message('error', 'AssetTypes_model: delete -
                        failed to set last modified time. Record id: '.$id.'
                        Table: '.$this->table);
                    return FALSE; // failed to set last modified time
                }
            } else {
                log_message('error', 'AssetTypes_model: delete -
                    failed to set last modified by. Record id: '.$id.'
                    User id: '.$id.' Table: '.$this->table);
                return FALSE;  // failed to set last modified by
            }
        } else {
            log_message('error', 'AssetTypes_model: delete -
                failed, record '.$id.' doesn\'t exist or is deleted');
            return FALSE; // failed, record doesn't exist or is deleted
        }
    }

    public function is_name_unique($name) {
        $this->db->select($this->get_table_columns());
        $this->db->from($this->table);
        $this->db->where('name', $name);
        $this->db->where('is_deleted', 0);

        if ($this->db->get()->num_rows() == 0) {
            return TRUE;
        } else {
            return FALSE;
        }
	}
}

?>
