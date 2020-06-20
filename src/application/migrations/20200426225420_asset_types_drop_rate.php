<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Asset_types_drop_rate extends CI_Migration {
    
    public function up() { 
        $this->dbforge->drop_column('asset_types', 'rate');
    }
    
    public function down() { 
        $this->dbforge->add_column('asset_types', array(
            'rate' => array(
                'type' => 'DECIMAL',
                'constraint' => '13,2',
                'after' => 'name',
            )
        ));

        $this->load->model('AssetTypes_model');
        $this->load->model('Models_model');

        $asset_type_rates = $this->Models_model->get_asset_type_rates();

        foreach ($asset_type_rates as $asset_type_rate) {
            $asset_type = $this->AssetTypes_model->get_by_id($asset_type_rate['type_id']);
            if ($asset_type) {
                $asset_type['rate'] = $asset_type_rate['rate'];
                $this->AssetTypes_model->update($asset_type);
            }
        }
    }
}

?>
