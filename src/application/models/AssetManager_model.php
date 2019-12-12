<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AssetManager_model extends CI_Model {

    private $table;
    private $user_id;
    private $fields;

    function __construct() {
        parent::__construct();
        $this->table = "assets";
        $this->user_id = $this->session->userdata('id');
        $this->fields = array(
            'id' => 'id',
            'name' => 'name',
            'manufacturer' => 'manufacturer',
            'model' => 'model',
            'owner' => 'owner',
            'serial_number' => 'serial_number',
            'type' => 'type',
            'asset_tag' => 'asset_tag',
            'purchase_price' => 'purchase_price',
            'purchase_date' => 'purchase_date',
            'location' => 'location',
            'team' => 'team',
            'job_number' => 'job_number',
            'is_deleted' => 'is_deleted',
            'last_modified_by' => 'last_modified_by',
            'last_modified_time' => 'last_modified_time',
            'created_by' => 'created_by',
            'created_time' => 'created_time'
        );
    }

        public function get_active() {
            $this->db->select('
              a.id              as id,
              a.model           as name,
              ma.name           as manufacturer,
              mo.name           as model,
              a.owner           as owner,
              a.serial_number   as serial_number,
              at.name           as type,
              a.asset_tag       as asset_tag,
              a.purchase_price  as purchase_price,
              a.purchase_date   as purchase_date,
              a.location        as location,
              t.name            as team,
              a.job_number      as job_number,
              at.rate           as rate,
              a.last_modified_time
                                as last_modified_time
            ');
            $this->db->from('assets as a');
            $this->db->join('asset_types as at'
                          , 'a.type = at.id');
            $this->db->join('teams as t'
                          , 'a.team = t.id');
            $this->db->join('models as mo'
                          , 'a.model = mo.id');
            $this->db->join('manufacturers as ma'
                          , 'mo.manufacturer = ma.id');
            $this->db->where('a.is_deleted', FALSE);
            $query = $this->db->get()->result_array();

            return $query;
        }

        public function add_asset() {
            $this->load->helper('form');
            $this->load->library('form_validation');


        }

        public function update_asset() {


        }

        function get_count_by_asset_type($asset_type) {
            log_message('debug', 'AssetManager_model: get_count_by_asset_type - in function. asset_type='.$asset_type);

            $this->db->select('assets.id');
            $this->db->from('assets');
            $this->db->join('asset_types', 'asset_types.id = assets.type');
            $this->db->where('asset_types.name', $asset_type);
            $this->db->where('assets.is_deleted', FALSE);

            $query = $this->db->get();

            $num_rows = $query->num_rows();

            log_message('debug', 'AssetManager_model: get_count_by_asset_type - num_rows='.$num_rows);

            return $num_rows;
        }

        function get_month_forecast($asset_type) {
            log_message('debug', 'AssetManager_model: get_month_forecast - in function');

            $this->db->select('assets.id');
            $this->db->from('assets');
            $this->db->join('asset_types', 'asset_types.id = assets.type');
            $this->db->where('asset_types.name', $asset_type);
            $this->db->where('assets.is_deleted', FALSE);

            $query = $this->db->get();

            $num_rows = $query->num_rows();

            return $num_rows;
        }
}

?>
