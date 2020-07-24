<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migrate extends CI_Controller {
    
    const MIGRATIONS_PATH = APPPATH . '/migrations';
    const BACKUP_PATH = FCPATH . '/database-backups';
    private $database_name;

	public function __construct() {
		parent::__construct();
    		
        if (!$this->input->is_cli_request()) {
            redirect('forbidden');
        }
        
        $this->database_name = 'csm_inventory';
        
        $this->load->library('migration');
	}

	public function version($version) {
        $migration = $this->migration->version($version);
        
        if (!$migration) {
            echo $this->migration->error_string();
            return FALSE;
        } else {
            echo 'Migration done'.PHP_EOL;
            return TRUE;
        }
	}
    
    public function generate($name = FALSE) {
        if (!$name) {
            echo 'Please define migration name'.PHP_EOL;
            return;
        }
        
        if (!preg_match('/^[a-z_]+$/i', $name)) {
            if (strlen($name) < 4) {
                echo "Migration name must be at least 4 characters long".PHP_EOL;
                return;
            }
            echo 'Invalid migration name. Allowed characters: a-z and _'.PHP_EOL;
            return;
        }
        
        $filename = date('YmdHis').'_'.$name.'.php';
        
        try {
            $folderPath = APPPATH . 'migrations';
            if (!is_dir($folderPath)) {
                try {
                    mkdir($folderPath);
                } catch (Exception $e) {
                    echo "Error:\n" . $e->getMessage() . PHP_EOL;
                }
            }
            
            $filepath = APPPATH . 'migrations/' . $filename;
            if (file_exists($filepath)) {
                echo "File allredy exists:\n" . $filepath . PHP_EOL;
                return;
            }
            
            $data['class_name'] = ucfirst($name);
            $template = $this->load->view('cli/migrations/migration_class_template', $data, TRUE);
            
            try {
                $file = fopen($filepath, "w");
                $content = "<?php\n" . $template;
                fwrite($file, $content);
                fclose($file);
            } catch (Exception $e){
                echo "Error:\n" . $e->getMessage() . PHP_EOL;
            }
            echo "Migration created successfully!\nLocation: " . $filepath . PHP_EOL;
            
        } catch (Exception $e) {
            echo "Can't create migration file!\nError: " . $e->getMessage() . PHP_EOL;
        }
    }
    
    public function backup() {
        echo 'Backing up database'.PHP_EOL;
        
        $this->load->dbutil();
        $this->load->helper('file');
        
        $backup = $this->dbutil->backup(array(
            'format' => 'sql'
        ));
        $backup_filename = $filename = date('YmdHis').'.sql';
        
        if (!is_dir(SELF::BACKUP_PATH)) {
            try {
                mkdir(SELF::BACKUP_PATH);
            } catch (Exception $e) {
                echo 'Failed to backup database'.PHP_EOL;
                echo "Error:\n" . $e->getMessage() . PHP_EOL;
                return FALSE;
            }
        }
        
        if (write_file(SELF::BACKUP_PATH.'/'.$backup_filename, $backup)) {
            echo 'Database backed up'.PHP_EOL;
            return TRUE;
        } else {
            echo 'Failed to backup database'.PHP_EOL;
            return FALSE;
        }
    }
    
    public function fresh() {
        if ($this->backup()) {
            if ($this->drop_all_tables()) {
                $this->current();
            }
        }
    }
    
    private function drop_all_tables() {
        echo 'Dropping all tables'.PHP_EOL;
        if ($this->version('0')) {
            echo 'All tables dropped'.PHP_EOL;
            return TRUE;
        } else {
            echo 'Failed to drop all tables'.PHP_EOL;
            return FALSE;
        }
    }
    
    private function drop_database() {
        echo 'Dropping database'.PHP_EOL;
        if ($this->dbforge->drop_database($this->database_name)) {
            echo 'Database dropped'.PHP_EOL;
            return TRUE;
        } else {
            echo 'Failed to drop database'.PHP_EOL;
            return FALSE;
        }
    }
    
    public function create_database() {
        echo 'Creating new database'.PHP_EOL;
        if ($this->dbforge->create_database($this->database_name)) {
            echo 'Database created'.PHP_EOL;
            return TRUE;
        } else {
            echo 'Failed to create databsae'.PHP_EOL;
            return FALSE;
        }
    }
    
    public function current() {
        $this->load->model('Migrations_model');
        
        try {
            $current_version = (int)$this->Migrations_model->get_version();
        } catch (Exception $e) {
            echo print_r($e);
            exit;
        }
        $latest_migration_version = (int)explode('_',scandir(Self::MIGRATIONS_PATH, SCANDIR_SORT_DESCENDING)[0])[0];
        
        if ($current_version < $latest_migration_version) {
            if ($this->backup()) {
                echo 'Running all migrations...'.PHP_EOL;
                $this->version($latest_migration_version);
            }
        } else {
            echo 'Database already up to date'.PHP_EOL;
        }
    }
}
