<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Assets_add_phone_number extends CI_Migration {
    
    public function up() { 
        $this->dbforge->add_column('assets', array(
            'phone_number' => array(
                'type' => 'VARCHAR',
                'constraint' => 255,
                'after' => 'asset_tag',
            )
        )
    );
    }
    
    public function down() { 
        $this->dbforge->drop_column('assets', 'phone_number');
    }
}

?>
