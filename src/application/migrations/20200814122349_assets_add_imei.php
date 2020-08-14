<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Assets_add_imei extends CI_Migration {
    
    public function up() { 
        $this->dbforge->add_column('assets', array(
            'imei' => array(
                'type' => 'VARCHAR',
                'constraint' => 255,
                'after' => 'phone_number',
            )
        )
    );
    }
    
    public function down() { 
        $this->dbforge->drop_column('assets', 'imei');
    }
}

?>
