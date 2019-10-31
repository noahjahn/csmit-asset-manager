<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<?php
  $this->load->view('private/reusable/dataTables-include.php');
  $this->load->view('private/modals/assets/delete.php');
  $this->load->view('private/modals/assets/edit.php');
  $this->load->view('private/modals/assets/add.php');
  ?>
<script id="asset-manager-script" data-load-datatable="true" src="<?php echo base_url(); ?>assets/js/asset_manager.js"></script>
<table id="asset_manager" class="table table-hover">
    <thead class="table-header">
        <tr class="table-primary">
            <!-- <th scope="col">Name</th> -->
            <th scope="col">Model</th>
            <th scope="col">Manufacturer</th>
            <th scope="col">Owner</th>
            <!-- <th scope="col">Serial Number</th> -->
            <th scope="col">Type</th>
            <th scope="col">Asset Tag</th>
            <!-- <th scope="col">Purchase Price</th> -->
            <!-- <th scope="col">Purchase Date</th> -->
            <!-- <th scope="col">Location</th> -->
            <th scope="col">Team</th>
            <!-- <th scope="col">Job Number</th> -->
            <th scope="col">Rate</th>
            <!-- <th scope="col">Last Updated</th> -->
            <th></th><th></th>
        </tr>
    </thead>
    <!-- <tbody>
        <?php
        $assetCount = 0;
        foreach($data->result_array() as $asset) {
            // if ($assetCount % 2 == 0) {
            //     echo '<tr>';
            // } else {
            //     echo '<tr class="table-secondary">';
            // }

            // echo '<td>'.$asset['name'].'</td>';
            echo '<td>'.$asset['model'].'</td>';
            echo '<td>'.$asset['manufacturer'].'</td>';
            echo '<td>'.$asset['owner'].'</td>';
            // echo '<td>'.$asset['serial_number'].'</td>';
            echo '<td>'.$asset['type'].'</td>';
            echo '<td>'.$asset['asset_tag'].'</td>';
            // echo '<td>'.'$'.$asset['purchase_price'].'</td>';
            // echo '<td>'.$asset['purchase_date'].'</td>';
            // echo '<td>'.$asset['location'].'</td>';
            echo '<td>'.$asset['team'].'</td>';
            // echo '<td>'.$asset['job_number'].'</td>';
            echo '<td>'.'$'.$asset['rate'].'</td>';
            // echo '<td>'.$asset['last_modified_time'].'</td>';
            echo '<td><button class="table-icon" data-toggle="modal" data-target="#edit-asset"><img class="mini-icon" src="'.base_url().'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
            echo '<td><button class="table-icon" data-toggle="modal" data-target="#delete-asset"><img class="mini-icon" src="'.base_url().'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
            echo '</tr>';
            $assetCount++;
        }
        ?>
    </tbody> -->
</table>
