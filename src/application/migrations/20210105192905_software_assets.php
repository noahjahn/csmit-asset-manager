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
                'null' => TRUE,
            ),
            'password' => array(
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => TRUE,
            ),
            'login_url' => array(
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => TRUE,
            ),
            'notes' => array(
                'type' => 'TEXT',
                'constraint' => '500',
                'null' => TRUE,
            ),
            'renewal_date' => array(
                'type' => 'TIMESTAMP',
                'null' => TRUE,
            ),
            'renewal_type_id' => array(
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => TRUE,
                'null' => TRUE,
            ),
            'cost' => array(
                'type' => 'DECIMAL',
                'constraint' => '13,2',
                'null' => TRUE,
            ),
            'representative_contact' => array(
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => TRUE,
            ),
            'license_keys' => array(
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => TRUE,
            ),
            'owner' => array(
                'type' => 'VARCHAR',
                'constraint' => '255',
                'null' => TRUE,
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
