<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<?php
  $this->load->view('private/reusable/datatables-include.php');
?>
<script id="software-assets-script" data-load-datatable="true" src="<?php echo base_url(); ?>assets/js/software_assets.js"></script>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/libraries/semantic/dropdown.css"/>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/libraries/semantic/transition.css"/>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/libraries/semantic/custom.css"/>
<script src="<?php echo base_url(); ?>assets/libraries/semantic/dropdown.js"></script>
<script src="<?php echo base_url(); ?>assets/libraries/semantic/transition.js"></script>
<table id="software-assets" class="table table-hover">
    <thead class="table-header">
        <tr class="table-primary">
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Login URL</th>
            <th>Renewal Date</th>
            <th>Renewal Type</th>
            <th>Cost</th>
            <th>Owner</th>
            <th></th><th></th>
        </tr>
    </thead>
</table>
