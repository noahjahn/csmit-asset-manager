<div id="navigation" class="container-fluid bg-light bg-shadow ml-0 mw-15 min-vh-100 pl-0 pr-0 mr-0">
    <div id="nav-view-handler" class="nav-link pr-1" style="padding-left: 0; text-align: center;">
        <button id="nav-collapse" class="collapse-icon" style=""></button>
        <button id="nav-expand" class="expand-icon d-none vert-nav-item" style="background-repeat: no-repeat; background-size: 100% 100%; background-image: url(/assets/img/icons/expand-svgrepo-com.svg); transform: rotate(90deg); width: 32px; height: 32px;"></button>
    </div>
    <div id="usr-profile" class="text-center pt-4">
        <a href="" style="color: white;">
            <img class="usr-img" src="<?php echo base_url(); ?>assets/img/male-circle-512.png">
            <h6><i><?php echo $userdata['first_name'].' '.$userdata['last_name'] ?></i></h6>
        </a>
    </div>
    <ul class="nav navbar-light">
        <div class="navbar-nav w-100">
            <?php
            if ($userdata['dashboard'] == RW || $userdata['dashboard'] == R) {
                $this->load->view('private/navbar/dashboard');
            }
            if ($userdata['asset_manager'] == RW || $userdata['asset_manager'] == R) {
                $this->load->view('private/navbar/assetmanager');
            }
            if ($userdata['reports'] == RW || $userdata['reports'] == R) {
                $this->load->view('private/navbar/reports');
            }
            if ($userdata['asset_groups'] == RW || $userdata['asset_groups'] == R) {
                $this->load->view('private/navbar/settings');
            } else if ($userdata['users'] == RW || $userdata['users'] == R) {
                $this->load->view('private/navbar/settings');
            } else if ($userdata['roles'] == RW || $userdata['roles'] == R) {
                $this->load->view('private/navbar/settings');
            } else if ($userdata['login_photos'] == RW || $userdata['login_photos'] == R) {
                $this->load->view('private/navbar/settings');
            }
            ?>


        </div>
    </ul>
    <div class="container-fluid ml-0 mw-15 pl-0 pr-0" style="position: absolute; bottom: 0;">
        <ul class="w-100 nav navbar-light">
            <div class="navbar-nav w-100">
                <div class="side-color">
                    <li class="nav-item vert-nav-item">
                        <a class="nav-link" href="<?php echo base_url(); ?>logout">
                            <span>
                                <img class="icon" src="<?php echo base_url(); ?>assets/img/icons/logout-svgrepo-com.svg">
                            </span>
                            <span class="nav-title pl-3">Logout</span>
                        </a>
                    </li>
                </div>
            </div>
        </ul>
    </div>
</div>
