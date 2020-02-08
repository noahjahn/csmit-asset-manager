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
