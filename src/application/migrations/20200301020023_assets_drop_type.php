<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Assets_drop_type extends CI_Migration {
    
    public function up() { 
        $this->dbforge->drop_column('assets', 'type_id');
    }
    
    public function down() { 
        $this->dbforge->add_field(array(
                'type_id' => array(
                    'type' => 'INT',
                    'constraint' => 11,
                    'unsigned' => TRUE,
                )
            )
        );
    }
}

?>
