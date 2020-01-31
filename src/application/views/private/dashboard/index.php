<link rel="stylesheet" href="<?php echo base_url() . CHARTJS_CSS; ?>"/>

<div class="row mb-4 dashboard-row">
    <div class="col">
        <div class="dasbhoard-box text-center">
            <div class="dashboard-large-text">
                37
            </div>
            assets nearing end of life
        </div>
    </div>
    <div class="col">
        <div class="dasbhoard-box text-center">
            <canvas id="asset-types"></canvas>
        </div>
    </div>
    <div class="col">
        <div class="dasbhoard-box text-center">
            <div id="month-forecast" class="dashboard-large-text">

            </div>
            forecasted this month
        </div>
    </div>
</div>

<script src="<?php echo base_url() . CHARTJS_JS; ?>"></script>
<script src="<?php echo base_url(); ?>/assets/js/dashboard.js"></script>
