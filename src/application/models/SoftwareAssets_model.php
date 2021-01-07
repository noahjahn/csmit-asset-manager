<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SoftwareAssets_model extends CI_Model {

    private $table;
    private $user_id;
    private $fields;

    function __construct() {
        parent::__construct();
        $this->table = "software_assets";
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

}
?>
