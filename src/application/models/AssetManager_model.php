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
              a.notes           as notes,
              a.last_modified_time
                                as last_modified_time,
              ma.id             as manufacturer_id,
              mo.id             as model_id,
              at.id             as type_id,
              t.id              as team_id
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

        function add($asset) {
            log_message('debug', 'AssetManager_model: add - in function');
            $this->db->insert($this->table, $asset);

        }

        function update_asset() {


        }

        function delete($id) {
            log_message('debug', 'AssetManager_model: delete - in function');

            // check if model passed in exists and is not deleted
            if (record_exists($id, $this->table) && !(record_is_deleted($id, $this->table))) {
                // if it is, set is_deleted to 1, this is a soft delete
                if (set_last_modified_by($id, $this->user_id, $this->table)) {
                    if (set_last_modified_time($id, $this->table)) {
                        $this->db->set('is_deleted', '1');
                        $this->db->where('id', $id);
                        return $this->db->update($this->table);
                    } else {
                        log_message('error', 'AssetManager_model: delete - failed to set last modified time. Record id: '.$id.' Table: '.$this->table);
                        return FALSE; // failed to set last modified time
                    }
                } else {
                    log_message('error', 'AssetManager_model: delete - failed to set last modified by. Record id: '.$id.' User id: '.$id.' Table: '.$this->table);
                    return FALSE;  // failed to set last modified by
                }
            } else {
                log_message('error', 'AssetManager_model: delete - failed, record '.$id.' doesn\'t exist or is deleted');
                return FALSE; // failed, record doesn't exist or is deleted
            }
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
