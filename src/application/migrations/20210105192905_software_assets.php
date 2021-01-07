<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Software_assets extends CI_Migration {

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
                'constraint' => '255',
            ),
            'username' => array(
                'type' => 'VARCHAR',
                'constraint' => '255',
            ),
            'password' => array(
                'type' => 'VARCHAR',
                'constraint' => '255',
            ),
            'login_url' => array(
                'type' => 'VARCHAR',
                'constraint' => '255',
            ),
            'notes' => array(
                'type' => 'TEXT',
                'constraint' => '500',
            ),
            'renewal_date' => array(
                'type' => 'TIMESTAMP',
            ),
            'renewal_type_id' => array(
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => TRUE,
            ),
            'cost' => array(
                'type' => 'DECIMAL',
                'constraint' => '13,2',
            ),
            'representative_contact' => array(
                'type' => 'VARCHAR',
                'constraint' => '255',
            ),
            'license_keys' => array(
                'type' => 'VARCHAR',
                'constraint' => '255',
            ),
            'owner' => array(
                'type' => 'VARCHAR',
                'constraint' => '255',
            ),
            'is_deleted' => array(
                'type' => 'TINYINT',
                'default' => '0',
            ),
            'last_modified_by' => array(
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => TRUE,
            )

        ));
        $this->dbforge->add_field("`last_modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
        $this->dbforge->add_field("`created_by` INT(11) NOT NULL");
        $this->dbforge->add_field("`created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");

        $this->dbforge->add_key('id', TRUE);
        $this->dbforge->create_table('software_assets');
    }

    public function down() {
        $this->dbforge->drop_table('software_assets');
    }
}

?>
