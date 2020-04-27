<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Asset_types_drop_rate extends CI_Migration {
    
    public function up() { 
        $this->dbforge->drop_column('asset_types', 'rate');
    }
    
    public function down() { 
        $this->dbforge->add_field(array(
            'rate' => array(
                'type' => 'DECIMAL',
                'constraint' => '13,2',
                'after' => 'type_id',
            )
        ));

        $this->load->model('Models_model');
        $this->load->model('AssetTypes_model');

        // foreach model with unique asset types id
        // set the asset type with the rate on the model
    }
}

?>
