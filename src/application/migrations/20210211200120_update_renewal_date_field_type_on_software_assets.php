<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Update_renewal_date_field_type_on_software_assets extends CI_Migration {
    
    public function up() { 
        $this->dbforge->modify_column('software_assets', array(
            'renewal_date' => array(
                'type' => 'DATE',
                'null' => TRUE,
            ),
        ));
    }
    
    public function down() { 
        $this->dbforge->modify_column('software_assets', array(
            'renewal_date' => array(
                'type' => 'TIMESTAMP',
                'null' => TRUE,
            ),
        ));
    }
}

?>
