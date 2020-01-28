<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Assets extends CI_Migration {
    
    public function up() { 
        $this->dbforge->add_field(array(
                'id' => array(
                    'type' => 'INT',
                    'constraint' => 11,
                    'unsigned' => TRUE,
                    'auto_increment' => TRUE
                ),
                'manufacturer_id' => array(
                    'type' => 'INT',
                    'constraint' => 11,
                    'unsigned' => TRUE,
                ),
                'mdoel_id' => array(
                    'type' => 'INT',
                    'constraint' => 11,
                    'unsigned' => TRUE,
                ),
                'owner_id' => array(
                    'type' => 'INT',
                    'constraint' => 11,
                    'unsigned' => TRUE,
                ),
                'serial_number' => array(
                    'type' => 'VARCHAR',
                    'constraint' => '128',
                ),
                'type_id' => array(
                    'type' => 'INT',
                    'constraint' => 11,
                    'unsigned' => TRUE,
                ),
                'asset_tag' => array(
                    'type' => 'VARCHAR',
                    'constraint' => 32,
                ),
                'purchase_price' => array(
                    'type' => 'DECIMAL',
                    'constraint' => '13,2',
                    'null' => TRUE,
                ),
                'purchase_date' => array(
                    'type' => 'DATE',
                ),
                'team_id' => array(
                    'type' => 'INT',
                    'constraint' => 11,
                    'unsigned' => TRUE,
                ),
                'job_number' => array(
                    'type' => 'VARCHAR',
                    'constraint' => 32,
                ),
                'notes' => array(
                    'type' => 'TEXT',
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
        $this->dbforge->create_table('assets');
    }
    
    public function down() { 
        $this->dbforge->drop_table('assets');
    }
}

?>
