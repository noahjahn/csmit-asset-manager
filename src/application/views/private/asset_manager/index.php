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
<table id="asset-manager" class="table table-hover">
    <thead class="table-header">
        <tr class="table-primary">
            <!-- <th scope="col">Name</th> -->
            <th>Id</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Owner</th>
            <!-- <th scope="col">Serial Number</th> -->
            <th>Type</th>
            <th>Asset Tag</th>
            <!-- <th scope="col">Purchase Price</th> -->
            <!-- <th scope="col">Purchase Date</th> -->
            <!-- <th scope="col">Location</th> -->
            <th>Team</th>
            <!-- <th scope="col">Job Number</th> -->
            <th>Rate</th>
            <!-- <th scope="col">Last Updated</th> -->
            <th></th><th></th>
        </tr>
    </thead>
</table>

<!-- <table id="asset_types" class="table table-hover">
    <thead class="table-header">
        <tr class="table-primary">
            <th>ID</th>
            <th>Name</th>
            <th>Rate</th>
            <th></th>
            <th></th>
        </tr>
    </thead>
</table> -->
