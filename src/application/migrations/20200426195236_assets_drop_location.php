<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Assets_drop_location extends CI_Migration {
    
    public function up() { 
        $this->dbforge->drop_column('assets', 'location');
    }
    
    public function down() { 
        $this->dbforge->add_column('assets', array(
                'location' => array(
                    'type' => 'VARCHAR',
                    'constraint' => '128',
                ),
            )
        );
    }
}

?>
