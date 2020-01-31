<?php $this->load->view('private/reusable/datatables-include.php'); ?>

<script src="<?php echo base_url(); ?>assets/js/settings.js"></script>

<div class="row">
    <ul id="nav-tabs" class="nav nav-tabs" style="width: 100%">
        <?php
        if ($userdata['asset_groups'] == 6 || $userdata['asset_groups'] == 4) {
            echo '<li class="nav-item">
                    <a id="asset-manager-link" class="nav-link active" href="#asset_manager">Asset Manager</a>
                  </li>';
        }
        if ($userdata['users'] == 6 || $userdata['users'] == 4) {
            echo '<li class="nav-item">
                    <a id="users-link" class="nav-link" href="#users">Users</a>
                  </li>';
        }
        if ($userdata['roles'] == 6 || $userdata['roles'] == 4) {
            echo '<li class="nav-item">
                    <a id="roles-link" class="nav-link" href="#roles">Roles</a>
                  </li>';
        }
        if ($userdata['login_photos'] == 6 || $userdata['login_photos'] == 4) {
            echo '<li class="nav-item">
                    <a id="login-photos-link" class="nav-link" href="#login_photos">Login Photos</a>
                  </li>';
        } ?>
    </ul>
    <div class="tab-content background-light w-100" id="nav-tab-content">
        <?php
        if ($userdata['asset_groups'] == 6) {
            echo '<div id="asset-manager-content" class="tab-pane fade" role="tabpanel">';
                    $this->load->view('private/settings/asset-manager-edit');
            echo '</div>';
        } elseif ($userdata['asset_groups'] == 4) {
            echo '<div id="asset-manager-content" class="tab-pane fade" role="tabpanel">';
                    $this->load->view('private/settings/asset-manager-view');
            echo '</div>';
        }
        if ($userdata['users'] == 6) {
            echo '<div id="users-content" class="tab-pane fade" role="tabpanel">';
                    $this->load->view('private/settings/users-edit');
            echo '</div>';
        } elseif ($userdata['users'] == 4) {
            echo '<div id="users-content" class="tab-pane fade" role="tabpanel">';
                    $this->load->view('private/settings/users-view');
            echo '</div>';
        }
        if ($userdata['roles'] == 6) {
            echo '<div id="roles-content" class="tab-pane fade" role="tabpanel">';
                    $this->load->view('private/settings/roles-edit');
            echo '</div>';
        } elseif ($userdata['roles'] == 4) {
            echo '<div id="roles-content" class="tab-pane fade" role="tabpanel">';
                    $this->load->view('private/settings/roles-view');
            echo '</div>';
        }
        if ($userdata['login_photos'] == 6) {
            echo '<div id="login-photos-content" class="tab-pane fade" role="tabpanel">';
                    $this->load->view('private/settings/login-photos-edit');
            echo '</div>';
        } elseif ($userdata['login_photos'] == 4) {
            echo '<div id="login-photos-content" class="tab-pane fade" role="tabpanel">';
                    $this->load->view('private/settings/login-photos-view');
            echo '</div>';
        } ?>
    </div>
</div>
