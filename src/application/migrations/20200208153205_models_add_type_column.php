<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Models_add_type_column extends CI_Migration {

    public function up() {
        $this->dbforge->add_column('models', array(
                'type_id' => array(
                    'type' => 'INT',
                    'constraint' => 11,
                    'unsigned' => TRUE,
                    'after' => 'manufacturer_id',
                )
            )
        );
    }

    public function down() {
        $this->dbforge->drop_column('models', 'type_id');
    }
}

?>
