<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Assets_modify_purchase_date extends CI_Migration {
    
    public function up() { 
        $this->dbforge->modify_column('assets', "`purchase_date`");
    }
    
    public function down() { 
        $this->dbforge->modify_column('assets', array(
                'purchase_date' => array(
                    'null' => FALSE,
                )
            )
        );
    }
}

?>
