<div id="navigation" class="container-fluid bg-light ml-0 mw-15 min-vh-100 pl-0 pr-0 mr-0">
    <div id="nav-view-handler" class="nav-link pr-1" style="padding-left: 0; text-align: center;">
        <button id="nav-collapse" class="btn" style="background-repeat: no-repeat; background-size: 100% 100%; background-image: url(/assets/img/icons/back-svgrepo-com.svg); float: right; width: 32px; height: 32px;"></button>
        <button id="nav-expand" class="d-none btn vert-nav-item" style="background-repeat: no-repeat; background-size: 100% 100%; background-image: url(/assets/img/icons/expand-svgrepo-com.svg); transform: rotate(90deg); width: 32px; height: 32px;"></button>
    </div>
    <div id="usr-profile" class="text-center pt-4">
        <a href="" style="color: white;">
            <img class="usr-img" src="<?php echo base_url(); ?>assets/img/male-circle-512.png">
            <h6><i>Noah Jahn<?php //echo $first_name . ' ' . $last_name ?></i></h6>
        </a>
    </div>
    <ul class="nav navbar-light">
        <div class="navbar-nav w-100">
            <div class="side-color <?php echo $active_page == 'dashboard' ? 'vert-nav-item-active' : ''; ?>">
                <li class="nav-item <?php echo $active_page == 'dashboard' ? 'vert-nav-item-active-format' : 'vert-nav-item'; ?>">
                    <a class="nav-link <?php echo $active_page == 'dashboard' ? 'active' : ''; ?>" href="<?php echo base_url(); ?>dashboard">
                        <span>
                            <img class="icon" src="<?php echo base_url(); ?>assets/img/icons/pie-graph-svgrepo-com.svg">
                        </span>
                        <span class="nav-title pl-3">Dashboard</span>
                    </a>
                </li>
            </div>
            <div class="side-color <?php echo $active_page == 'assetmanager' ? 'vert-nav-item-active' : ''; ?>">
                <li class="nav-item <?php echo $active_page == 'assetmanager' ? 'vert-nav-item-active-format' : 'vert-nav-item'; ?>">
                    <a class="nav-link <?php echo $active_page == 'assetmanager' ? 'active' : ''; ?>" href="<?php echo base_url(); ?>assetmanager">
                        <span>
                            <img class="icon" src="<?php echo base_url(); ?>assets/img/icons/computer-svgrepo-com.svg">
                        </span>
                        <span class="nav-title pl-3">Asset Manager</span>
                    </a>
                </li>
            </div>
            <div class="side-color <?php echo $active_page == 'helpdesk' ? 'vert-nav-item-active' : ''; ?>">
                <li class="nav-item <?php echo $active_page == 'helpdesk' ? 'vert-nav-item-active-format' : 'vert-nav-item'; ?>">
                    <a class="nav-link <?php echo $active_page == 'helpdesk' ? 'active' : ''; ?>" href="<?php echo base_url(); ?>helpdesk">
                        <span>
                            <img class="icon" src="<?php echo base_url(); ?>assets/img/icons/help-svgrepo-com.svg">
                        </span>
                        <span class="nav-title pl-3">Helpdesk</span>
                    </a>
                </li>
            </div>
            <div class="side-color <?php echo $active_page == 'inventories' ? 'vert-nav-item-active' : ''; ?>">
                <li class="nav-item <?php echo $active_page == 'inventories' ? 'vert-nav-item-active-format' : 'vert-nav-item'; ?>">
                    <a class="nav-link <?php echo $active_page == 'inventories' ? 'active' : ''; ?>" href="<?php echo base_url(); ?>inventories">
                        <span>
                            <img class="icon" src="<?php echo base_url(); ?>assets/img/icons/check-list-svgrepo-com.svg">
                        </span>
                        <span class="nav-title pl-3">Inventories</span>
                    </a>
                </li>
            </div>
            <div class="side-color <?php echo $active_page == 'reports' ? 'vert-nav-item-active' : ''; ?>">
                <li class="nav-item <?php echo $active_page == 'reports' ? 'vert-nav-item-active-format' : 'vert-nav-item'; ?>">
                    <a class="nav-link <?php echo $active_page == 'reports' ? 'active' : ''; ?>" href="<?php echo base_url(); ?>reports">
                        <span>
                            <img class="icon" src="<?php echo base_url(); ?>assets/img/icons/report-svgrepo-com.svg">
                        </span>
                        <span class="nav-title pl-3">Reports</span>
                    </a>
                </li>
            </div>
            <div class="side-color <?php echo $active_page == 'passwordmanager' ? 'vert-nav-item-active' : ''; ?>">
                <li class="nav-item <?php echo $active_page == 'passwordmanager' ? 'vert-nav-item-active-format' : 'vert-nav-item'; ?>">
                    <a class="nav-link <?php echo $active_page == 'passwordmanager' ? 'active' : ''; ?>" href="<?php echo base_url(); ?>passwordmanager">
                        <span>
                            <img class="icon" src="<?php echo base_url(); ?>assets/img/icons/padlock-svgrepo-com.svg">
                        </span>
                        <span class="nav-title pl-3">Password Manager</span>
                    </a>
                </li>
            </div>
            <div class="side-color <?php echo $active_page == 'settings' ? 'vert-nav-item-active' : ''; ?>">
                <li class="nav-item <?php echo $active_page == 'settings' ? 'vert-nav-item-active-format' : 'vert-nav-item'; ?>">
                    <a class="nav-link <?php echo $active_page == 'settings' ? 'active' : ''; ?>" href="<?php echo base_url(); ?>settings">
                        <span>
                            <img class="icon" src="<?php echo base_url(); ?>assets/img/icons/gears-svgrepo-com.svg">
                        </span>
                        <span class="nav-title pl-3">Settings</span>
                    </a>
                </li>
            </div>
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
