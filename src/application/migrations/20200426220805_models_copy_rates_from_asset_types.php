<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Models_copy_rates_from_asset_types extends CI_Migration {
    
    public function up() { 
        $this->load->model('Models_model');
        
        $models = $this->Models_model->get();
        foreach ($models as $model) {
            $this->Models_model->update(array(
                'id' => $model['model_id'],
                'name' => $model['model_name'],
                'rate' => $model['asset_type_rate']                
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
