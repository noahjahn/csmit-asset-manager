<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Models_add_rate extends CI_Migration {
    
    public function up() { 
        $this->dbforge->add_column('models', array(
            'rate' => array(
                'type' => 'DECIMAL',
                'constraint' => '13,2',
                'after' => 'type_id',
            )
        ));
    }
    
    public function down() { 
        $this->dbforge->drop_column('models', 'rate');
    }
}

?>
