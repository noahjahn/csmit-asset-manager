<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Renewal_types extends CI_Migration {

    public function up() {
      $this->dbforge->add_field(array(
      'id' => array(
          'type' => 'INT',
          'constraint' => 11,
          'unsigned' => TRUE,
          'auto_increment' => TRUE,
          'null' => FALSE,
      ),
      'name' => array(
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
  $this->dbforge->create_table('renewal_types');

  }

    public function down() {
    $this->dbforge->drop_table('renewal_types');
    }
}

?>
