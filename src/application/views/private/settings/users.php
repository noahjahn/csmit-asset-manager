<script id="users-script" data-load-datatable="true" src="<?php echo base_url(); ?>assets/js/users.js"></script>

<div class="container-fluid container-style">
    <table id="users" class="table table-hover">
        <!-- <col width="30%">
        <col width="30%">
        <col width="30%">
        <col width="5%">
        <col width="5%"> -->
        <thead class="table-header">
            <tr class="table-primary">
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
    </table>
</div>

<?php $this->load->view('private/modals/users/all'); ?>
