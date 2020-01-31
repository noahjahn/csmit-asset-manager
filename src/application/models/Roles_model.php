<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Roles_model extends CI_Model {

    private $table;
    private $user_id;
    private $fields;
    private $permissionable_pages;

    function __construct() {
        parent::__construct();
        $this->load->helper('database');
        $this->table = "roles";
        $this->user_id = $this->session->userdata('id');
        $this->fields = array(
            'id' => 'id',
            'name' => 'name',
            'dashboard' => 'dashboard',
            'asset_manager' => 'asset_manager',
            'reports' => 'reports',
            'asset_groups' => 'asset_groups',
            'users' => 'users',
            'roles' => 'roles',
            'login_photos' => 'login_photos',
            'is_deleted' => 'is_deleted',
            'last_modified_by' => 'last_modified_by',
            'last_modified_time' => 'last_modified_time',
            'created_by' => 'created_by',
            'created_time' => 'created_time'
        );
        $this->permissionable_pages = array(
            'dashboard',
            'asset_manager',
            'reports',
            'asset_groups',
            'users',
            'roles',
            'login_photos'
        );
    }

    function get_page_access($id, $page) {
        log_message('debug', 'Roles_model: get_page_access - in function. id='.$id.',page='.$page);

        if ($this->id_exists($id) && !(record_is_deleted($id, $this->table))) {
            if (in_array($page, $this->permissionable_pages)) {
                $this->db->select($page);
                $this->db->from($this->table);
                $this->db->where('id', $id);
                return $this->db->get()->result_array()[0][$page];
            } else {
                log_message('debug', 'Roles_model: get_page_access - page not in permissionable pages. page='.$page);
                return FALSE;
            }
        } else {
            return FALSE;
        }
    }

    function get_settings_access($id) {
        log_message('debug', 'Roles_model: get_settings_access - in function');

        if ($this->id_exists($id) && !(record_is_deleted($id, $this->table))) {
            $tabs = array(
                'asset_groups' => $this->get_page_access($id, 'asset_groups'),
                'users' => $this->get_page_access($id, 'users'),
                'roles' => $this->get_page_access($id, 'roles'),
                'login_photos' => $this->get_page_access($id, 'login_photos')
            );
            return $tabs;
        } else {
            return FALSE;
        }
    }

    function get_insert_rules() {
        log_message('debug', 'Roles_model: get_insert_rules - in function');

        $form_rules = array(
            $this->get_insert_name_rules(),
            $this->get_dashboard_rules(),
            $this->get_asset_manager_rules(),
            $this->get_reports_rules(),
            $this->get_asset_groups_rules(),
            $this->get_users_rules(),
            $this->get_roles_rules(),
            $this->get_login_photos_rules()
        );
        return $form_rules;
    }

    function get_insert_name_rules() {
        log_message('debug', 'Roles_model: get_insert_name_rules - in function');
        $name_rules = array(
            'field' => $this->fields['name'],
            'label' => 'name',
            'rules' => 'required|callback_is_name_unique|trim',
            'errors' => array(
                'is_name_unique' => 'The %s field must contain a unique value.'
            )
        );
        return $name_rules;
    }

    function get_dashboard_rules() {
        log_message('debug', 'Roles_model: get_dashboard_rules - in function');
        $dashboard_rules = array(
            'field' => $this->fields['dashboard'],
            'label' => 'dashboard',
            'rules' => 'required|callback_valid_permission|trim',
            'errors' => array(
                'valid_permission' => 'The %s field must contain a valid permission value.'
            )
        );
        return $dashboard_rules;
    }

    function get_asset_manager_rules() {
        log_message('debug', 'Roles_model: get_asset_manager_rules - in function');
        $asset_manager_rules = array(
            'field' => $this->fields['asset_manager'],
            'label' => 'asset manager',
            'rules' => 'required|callback_valid_permission|trim',
            'errors' => array(
                'valid_permission' => 'The %s field must contain a valid permission value.'
            )
        );
        return $asset_manager_rules;
    }

    function get_reports_rules() {
        log_message('debug', 'Roles_model: get_reports_rules - in function');
        $reports_rules = array(
            'field' => $this->fields['reports'],
            'label' => 'reports',
            'rules' => 'required|callback_valid_permission|trim',
            'errors' => array(
                'valid_permission' => 'The %s field must contain a valid permission value.'
            )
        );
        return $reports_rules;
    }

    function get_asset_groups_rules() {
        log_message('debug', 'Roles_model: get_asset_groups_rules - in function');
        $asset_groups_rules = array(
            'field' => $this->fields['asset_groups'],
            'label' => 'asset groups',
            'rules' => 'required|callback_valid_permission|trim',
            'errors' => array(
                'valid_permission' => 'The %s field must contain a valid permission value.'
            )
        );
        return $asset_groups_rules;
    }

    function get_users_rules() {
        log_message('debug', 'Roles_model: get_users_rules - in function');
        $users_rules = array(
            'field' => $this->fields['users'],
            'label' => 'users',
            'rules' => 'required|callback_valid_permission|trim',
            'errors' => array(
                'valid_permission' => 'The %s field must contain a valid permission value.'
            )
        );
        return $users_rules;
    }

    function get_roles_rules() {
        log_message('debug', 'Roles_model: get_roles_rules - in function');
        $roles_rules = array(
            'field' => $this->fields['roles'],
            'label' => 'roles',
            'rules' => 'required|callback_valid_permission|trim',
            'errors' => array(
                'valid_permission' => 'The %s field must contain a valid permission value.'
            )
        );
        return $roles_rules;
    }

    function get_login_photos_rules() {
        log_message('debug', 'Roles_model: get_login_photos_rules - in function');
        $login_photos_rules = array(
            'field' => $this->fields['login_photos'],
            'label' => 'login photos',
            'rules' => 'required|callback_valid_permission|trim',
            'errors' => array(
                'valid_permission' => 'The %s field must contain a valid permission value.'
            )
        );
        return $login_photos_rules;
    }

    function get_update_rules() {
        log_message('debug', 'Roles_model: get_update_rules - in function');

        $form_rules = array(
            $this->get_update_name_rules(),
            $this->get_dashboard_rules(),
            $this->get_asset_manager_rules(),
            $this->get_reports_rules(),
            $this->get_asset_groups_rules(),
            $this->get_users_rules(),
            $this->get_roles_rules(),
            $this->get_login_photos_rules()
        );
        return $form_rules;
    }

    function get_update_name_rules() {
        log_message('debug', 'Roles_model: get_update_name_rules - in function');
        $name_rules = array(
            'field' => $this->fields['name'],
            'label' => 'name',
            'rules' => 'required|callback_is_name_unique_not_different_from_current|trim',
            'errors' => array(
                'is_name_unique_not_different_from_current' => 'The %s field must contain a unique value.'
            )
        );
        return $name_rules;
    }

    function get_table_columns() {
        log_message('debug', 'Roles_model: get_table_columns - in function');
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

        log_message('debug', 'Roles_model: get_table_columns - columns: '.$return);
        return $return;
    }

    function get_active() {
        log_message('debug', 'Roles_model: get_active - in function');

        $this->db->select($this->get_table_columns());
        $this->db->from($this->table);
        $this->db->where('is_deleted', FALSE);
        return $this->db->get()->result_array();
    }

    function insert($role) {
        log_message('debug', 'Roles_model: insert - in function. role=');

        if ($this->is_name_unique($role['name'])) { // if it's unique, add it
            $this->db->insert($this->table, $role);
            return TRUE;
        } else {
            log_message('error', 'Roles_model: insert - failed, record '.$role['name'].' isn\'t unique');
            return FALSE;
        }
    }

    function update($role) {
        log_message('debug', 'Roles_model: update - in function');

        // check if user passed in exists and is active
        if (record_exists($role['id'], $this->table) && !(record_is_deleted($role['id'], $this->table))) {

            if ($this->is_name_unique_not_different_from_current($role['name'], $role['id'])) {
                log_message('debug', 'Roles_model: update - in function '.json_encode($role));
                $this->db->where('id', $role['id']);
                $this->db->update($this->table, $role);
                return TRUE;
            } else {
                log_message('error', 'Roles_model: update - failed, record '.$role['name'].' isn\'t unique');
                return FALSE;
            }
        } else {
            log_message('error', 'Roles_model: update - failed, record '.$role['id'].' doesn\'t exist or is inactive');
            return FALSE;
        }
    }

    function delete($id) {
        log_message('debug', 'Roles_model: delete - in function');

        // check if role passed in exists and is not deleted
        if (record_exists($id, $this->table) && !(record_is_deleted($id, $this->table))) {
            // if it is, set is_deleted to 1, this is a soft delete
            if (set_last_modified_by($id, $this->user_id, $this->table)) {
                if (set_last_modified_time($id, $this->table)) {
                    $this->db->set('is_deleted', '1');
                    $this->db->where('id', $id);
                    $this->db->update($this->table);
                    return TRUE;
                } else {
                    log_message('error', 'Roles_model: delete - failed to set last modified time. Record id: '.$id.' Table: '.$this->table);
                    return FALSE; // failed to set last modified time
                }
            } else {
                log_message('error', 'Roles_model: delete - failed to set last modified by. Record id: '.$id.' Role id: '.$id.' Table: '.$this->table);
                return FALSE;  // failed to set last modified by
            }
        } else {
            log_message('error', 'Roles_model: delete - failed, record '.$id.' doesn\'t exist or is deleted');
            return FALSE; // failed, record doesn't exist or is deleted
        }
    }

    function is_name_unique($name) {
        log_message('debug', 'Roles_model: is_name_unique - in function. name='.$name);

        $this->db->select($this->get_table_columns());
        $this->db->from($this->table);
        $this->db->where($this->fields['name'], $name);
        $this->db->where('is_deleted', 0);

        $query = $this->db->get();

        if ($query->num_rows() == 0) {
            return TRUE;
        } else {
            log_message('debug', 'Roles_model: is_name_unique - found more than one record with the same name '.$name);
            return FALSE;
        }
	}

    function is_name_unique_not_different_from_current($name, $id) {
        log_message('debug', 'Roles_model: is_name_unique_not_different_from_current - in function. name='.$name.' id='.$id);

        $this->db->select($this->get_table_columns());
        $this->db->from($this->table);
        $this->db->where('name', $name);
        $this->db->where('is_deleted', 0);

        $query = $this->db->get();

        if ($query->num_rows() == 1) {
            if ($query->result_array()[0]['id'] == $id) {
                return TRUE;
            } else {
                log_message('error', 'Roles_model: is_name_unique_not_different_from_current - the name '.$name.' entered already exists. id='.$id);
                return FALSE;
            }
        } else if ($query->num_rows() == 0) {
            log_message('debug', 'Roles_model: is_name_unique_not_different_from_current - a new name has been entered: '.$name);
            return TRUE;
        } else {
            log_message('error', 'Roles_model: is_name_unique_not_different_from_current - found more than one record with the same name: '.$name);
            return FALSE;
        }
	}

    function id_exists($id) {
        log_message('debug', 'Roles_model: id_exists - in function');
        return record_exists($id, $this->table);
    }
}

?>
