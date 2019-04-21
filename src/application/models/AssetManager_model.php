<?php
class AssetManager_model extends CI_Model {

        public function get_assets() {
            $this->db->select('assets.id as id, assets.model as name, '.
                'manufacturers.name as manufacturer, models.name as model, owner, '.
                'serial_number, asset_types.name as type, asset_tag, purchase_price, '.
                'purchase_date, location, teams.name as team, job_number, '.
                'asset_types.rate as rate, last_updated');
            $this->db->from('assets');
            $this->db->join('asset_types', 'assets.type = asset_types.id');
            $this->db->join('teams', 'assets.team = teams.id');
            $this->db->join('models', 'assets.model = models.id');
            $this->db->join('manufacturers', 'models.manufacturer = manufacturers.id');
            $query = $this->db->get();

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
