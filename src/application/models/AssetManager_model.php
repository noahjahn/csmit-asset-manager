<?php
class AssetManager_model extends CI_Model {

        public function get_assets() {
            $this->db->select('assets.name as name, manufacturer, model, owner, serial_number, asset_types.name as type, asset_tag, purchase_price, purchase_date, location, teams.name as team, job_number, asset_types.rate as rate, last_updated');
            $this->db->from('assets');
            $this->db->join('asset_types', 'assets.type = asset_types.id');
            $this->db->join('teams', 'assets.team = teams.id');
            $query = $this->db->get();

            return $query;
        }

}

?>
