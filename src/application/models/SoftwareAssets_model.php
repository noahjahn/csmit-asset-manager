<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH.'/libraries/exceptions/RecordDoesntExistException.php';

class SoftwareAssets_model extends CI_Model {

    private $table;
    private $user_id;
    private $fields;

    function __construct() {
        parent::__construct();
        $this->load->helper('database_helper');
        $this->table = 'software_assets';
        $this->user_id = $this->session->userdata('id');
        $this->fields = array(
            'id' => 'id',
            'name' => 'name',
            'username' => 'username',
            'password' => 'password',
            'login_url' => 'login_url',
            'notes' => 'notes',
            'renewal_date' => 'renewal_date',
            'renewal_type_id' => 'renewal_type_id',
            'cost' => 'cost',
            'representative_contact' => 'representative_contact',
            'license_keys' => 'license_keys',
            'owner' => 'owner',
            'is_deleted' => 'is_deleted',
            'last_modified_by' => 'last_modified_by',
            'last_modified_time' => 'last_modified_time',
            'created_by' => 'created_by',
            'created_time' => 'created_time'
        );
    }
    public function get_active() {
        $this->db->select('*');
        $this->db->from('software_assets');
        $this->db->where('software_assets.is_deleted', FALSE);
        $software_assets = $this->db->get()->result_array();

        return $software_assets;
    }

    public function get_by_id($id){
      $this->db->select('*');
      $this->db->from('software_assets');
      $this->db->where('software_assets.id', $id);
      $this->db->where('software_assets.is_deleted', FALSE);
      return $this->db->get()->result_array();
    }

    function get_insert_rules() {
        log_message('debug', 'SoftwareAssets_model: get_insert_rules - in function');

        return array(
            $this->get_insert_name_rules(),
            $this->get_insert_username_rules(),
            $this->get_insert_password_rules(),
            $this->get_insert_login_url_rules(),
            $this->get_insert_notes_rules(),
            $this->get_insert_renewal_date_rules(),
            $this->get_insert_renewal_type_id_rules(),
            $this->get_insert_cost_rules(),
            $this->get_insert_representative_contact_rules(),
            $this->get_insert_license_keys_rules(),
            $this->get_insert_owner_rules(),
        );
    }

    function get_insert_name_rules() {
        log_message('debug', 'SoftwareAssets_model: get_insert_name_rules - in function');
        return array(
            'field' => $this->fields['name'],
            'label' => 'name',
            'rules' => 'required|trim',
        );
    }

    function get_insert_username_rules() {
        log_message('debug', 'SoftwareAssets_model: get_insert_username_rules - in function');
        return array(
            'field' => $this->fields['username'],
            'label' => 'username',
            'rules' => 'trim',
        );
    }

    function get_insert_password_rules() {
        log_message('debug', 'SoftwareAssets_model: get_insert_password_rules - in function');
        return array(
            'field' => $this->fields['password'],
            'label' => 'password',
            'rules' => 'trim',
          );
    }

    function get_insert_login_url_rules() {
        log_message('debug', 'SoftwareAssets_model: get_insert_login_url_rules - in function');
        return array(
            'field' => $this->fields['login_url'],
            'label' => 'login_url',
            'rules' => 'trim',
          );
    }

    function get_insert_notes_rules() {
        log_message('debug', 'SoftwareAssets_model: get_insert_notes_rules - in function');
        return array(
            'field' => $this->fields['notes'],
            'label' => 'notes',
            'rules' => 'trim',
          );
    }

    function get_insert_renewal_date_rules() {
        log_message('debug', 'SoftwareAssets_model: get_insert_renewal_date_rules - in function');
        return array(
            'field' => $this->fields['renewal_date'],
            'label' => 'renewal_date',
            'rules' => 'trim',
          );
    }

    function get_insert_renewal_type_id_rules() {
        log_message('debug', 'SoftwareAssets_model: get_insert_renewal_type_id_rules - in function');
        return array(
            'field' => $this->fields['renewal_type_id'],
            'label' => 'renewal_type_id',
            'rules' => 'trim',
          );
    }

    function get_insert_cost_rules() {
        log_message('debug', 'SoftwareAssets_model: get_insert_cost_rules - in function');
        return array(
            'field' => $this->fields['cost'],
            'label' => 'cost',
            'rules' => 'decimal|trim',
          );
    }

    function get_insert_representative_contact_rules() {
        log_message('debug', 'SoftwareAssets_model: get_insert_representative_contact_rules - in function');
        return array(
            'field' => $this->fields['representative_contact'],
            'label' => 'representative_contact',
            'rules' => 'trim',
          );
    }

    function get_insert_license_keys_rules() {
        log_message('debug', 'SoftwareAssets_model: get_insert_license_keys_rules - in function');
        return array(
            'field' => $this->fields['license_keys'],
            'label' => 'license_keys',
            'rules' => 'trim',
          );
    }

    function get_insert_owner_rules() {
        log_message('debug', 'SoftwareAssets_model: get_insert_owner_rules - in function');
        return array(
            'field' => $this->fields['owner'],
            'label' => 'owner',
            'rules' => 'trim',
        );
    }
    function get_delete_rules() {
      log_message('debug', 'SoftwareAssets_model: get_delete_rules - in function');
      return array(
            'field' => $this->fields['is_deleted'],
            'label' => 'is_deleted',
            'rules' => 'trim',
      );
    }
    function get_update_rules() {
        log_message('debug', 'SoftwareAssets_model: get_update_rules - in function');

        return array(
            $this->get_update_id_rules(),
            $this->get_insert_name_rules(),
            $this->get_insert_username_rules(),
            $this->get_insert_password_rules(),
            $this->get_insert_login_url_rules(),
            $this->get_insert_notes_rules(),
            $this->get_insert_renewal_date_rules(),
            $this->get_insert_renewal_type_id_rules(),
            $this->get_insert_cost_rules(),
            $this->get_insert_representative_contact_rules(),
            $this->get_insert_license_keys_rules(),
            $this->get_insert_owner_rules(),
            $this->get_delete_rules(),
        );
    }

    function get_update_id_rules() {
        log_message('debug', 'SoftwareAssets_model: get_update_id_rules - in function');
        return array(
            'field' => $this->fields['id'],
            'label' => 'id',
            'rules' => 'trim|is_natural_no_zero|required|callback_id_exists',
            'errors' => array(
                'id_exists' => 'The id entered doesn\'t exist',
            )
        );
    }

    function insert($software_asset) {
        log_message('debug', 'SoftwareAssets_model: insert - in function');
        $this->db->insert($this->table, $software_asset);
        return  $this->db->insert_id();
    }

    function update($software_asset){
        log_message('debug', 'SoftwareAssets_model: update - in function');

        if (record_exists($software_asset['id'], $this->table) && !(record_is_deleted($software_asset['id'], $this->table))) {
            $this->db->where('id', $software_asset['id']);
            $this->db->update($this->table, $software_asset);
        } else {
            log_message('error', 'SoftwareAssets_model: update - failed, record '.$software_asset['id'].' doesn\'t exist or is deleted');
            throw new RecordDoesntExistException('id', 'Record doesn\'t exist or is deleted');
        }
    }
    function delete($id){
      log_message('debug', 'SoftwareAssets_model: update - in function');
      if (record_exists($id, $this->table) && !(record_is_deleted($id, $this->table))) {
        $this->db->set('is_deleted', '1');
        $this->db->where('id', $id);
        return $this->db->update($this->table);
       } else {
           log_message('error', 'SoftwareAssets_model: delete - failed, record '.$id.' doesn\'t exist or is deleted');
           throw new RecordDoesntExistException('id', 'Record doesn\'t exist or is deleted');
       }
      }
}
?>
