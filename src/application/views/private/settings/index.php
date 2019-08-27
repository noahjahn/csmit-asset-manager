<?php $this->load->view('private/reusable/dataTables-include.php'); ?>

<script src="<?php echo base_url(); ?>assets/js/settings.js"></script>
<div class="row">
    <ul class="nav nav-tabs" style="width: 100%">
        <li class="nav-item">
            <a id="asset-manager-link" class="nav-link active" href="#asset_manager">Asset Manager</a>
        </li>
        <li class="nav-item">
            <a id="users-link" class="nav-link" href="#users">Users</a>
        </li>
        <li class="nav-item">
            <a id="permissions-link" class="nav-link disabled" href="#permissions">Permissions</a>
        </li>
        <li class="nav-item">
            <a id="login-photos-link" class="nav-link" href="#login_photos">Login Photos</a>
        </li>
    </ul>
    <div class="tab-content background-light w-100" id="nav-tabContent">
        <div id="asset-manager-content" class="tab-pane fade" role="tabpanel"><?php $this->load->view('private/settings/asset_manager', $data);?></div>
        <div id="users-content" class="tab-pane fade" role="tabpanel"><?php $this->load->view('private/settings/users', $this->data);?></div>
        <div id="permissions-content" class="tab-pane fade" role="tabpanel"><?php $this->load->view('private/settings/permissions', $this->data);?></div>
        <div id="login-photos-content" class="tab-pane fade" role="tabpanel"><?php $this->load->view('private/settings/login_photos', $this->data);?></div>
    </div>
</div>
