<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Models_copy_rates_from_asset_types extends CI_Migration {
    
    public function up() { 
        $this->load->model('Models_model');
        $this->load->model('Migrations_model');
        
        $models = $this->Models_model->get();
        foreach ($models as $model) {
            $rate = $this->Migrations_model->get_rate_from_asset_type_id($model['model_type_id']);
            $this->Models_model->update(array(
                'id' => $model['model_id'],
                'name' => $model['model_name'],
                'rate' => $rate                
            ));
        }
    }
    
    public function down() { 
        $this->load->model('Models_model');
        
        $models = $this->Models_model->get();
        foreach ($models as $model) {
            $this->Models_model->update(array(
                'id' => $model['model_id'],
                'name' => $model['model_name'],
                'rate' => ''           
            ));
        }
    }
}

?>
