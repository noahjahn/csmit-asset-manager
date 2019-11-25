<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AssetManager_model extends CI_Model {

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
}

?>
