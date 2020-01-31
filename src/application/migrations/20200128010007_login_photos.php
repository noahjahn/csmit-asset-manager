<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Login_photos extends CI_Migration {
    
    public function up() { 
        $this->dbforge->add_field(array(
                'id' => array(
                    'type' => 'INT',
                    'constraint' => 11,
                    'unsigned' => TRUE,
                    'auto_increment' => TRUE
                ),
                'name' => array(
                    'type' => 'VARCHAR',
                    'constraint' => '128',
                ),
                'is_deleted' => array(
                    'type' => 'TINYINT',
                    'default' => '0',
                ),
                'last_modified_by' => array(
                    'type' => 'INT',
                    'constraint' => 11,
                    'unsigned' => TRUE,
                ),
        ));
        $this->dbforge->add_field("`last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        $this->dbforge->add_field("`created_by` INT(11) NOT NULL");
        $this->dbforge->add_field("`created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");

        $this->dbforge->add_key('id', TRUE);
        $this->dbforge->create_table('login_photos');
    }

    public function down() { 
        $this->dbforge->drop_table('login_photos');
    }
}

?>
