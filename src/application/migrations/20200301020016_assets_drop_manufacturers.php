<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Assets_drop_manufacturers extends CI_Migration {
    
    public function up() { 
        $this->dbforge->drop_column('assets', 'manufacturer_id');
    }
    
    public function down() { 
        $this->dbforge->add_column('assets', array(
                'manufacturer_id' => array(
                    'type' => 'INT',
                    'constraint' => 11,
                    'unsigned' => TRUE,
                )
            )
        );
    }
}

?>
