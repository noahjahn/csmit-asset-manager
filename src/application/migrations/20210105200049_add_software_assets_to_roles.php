<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Add_software_assets_to_roles extends CI_Migration {

    public function up() {
        $this->dbforge->add_column('roles', array(
            'software_assets' => array(
                'type' => 'TINYINT',
                'default' => '0',
                'COMMENT' => '2=write; 4=read; 6=read write',
                'after' => 'login_photos',
            ))
        );
    }

    public function down() {
        $this->dbforge->drop_column('roles', 'software_assets');
    }
}

?>
