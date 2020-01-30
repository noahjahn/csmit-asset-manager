<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Assets_modify_owner extends CI_Migration {
    
    public function up() {    
        $this->dbforge->modify_column('assets', array(
                'owner_id' => array(
                    'name' => 'owner',
                    'type' => 'VARCHAR',
                    'constraint' => 128,
                )
            )
        );
    }
    
    public function down() {
        $this->dbforge->modify_column('assets', array(
                'owner' => array(
                    'name' => 'owner_id',
                    'type' => 'INT',
                    'constraint' => 11,
                    'unsigned' => TRUE,
                )
            )
        );
    }
}

?>
