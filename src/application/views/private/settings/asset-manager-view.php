<script id="asset-types-script" data-load-datatable="true" src="<?php echo base_url(); ?>assets/js/asset-types-view.js"></script>
<script id="teams-script" data-load-datatable="true" src="<?php echo base_url(); ?>assets/js/teams-view.js"></script>
<script id="manufacturers-script" data-load-datatable="true" src="<?php echo base_url(); ?>assets/js/manufacturers-view.js"></script>
<script id="models-script" data-load-datatable="true" src="<?php echo base_url(); ?>assets/js/models-view.js"></script>

<div class="container-fluid container-style">
    <div class="row">
        <div class="col-lg">
            <table id="asset_types" class="table table-hover">
                <col width="65%">
                <col width="25%">
                <col width="5%">
                <col width="5%">
                <thead class="table-header">
                    <tr class="table-primary">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Rate</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="col-lg">
            <table id="teams" class="table table-hover" style="table-layout: auto;">
                <col width="90%">
                <col width="5%">
                <col width="5%">
                <thead>
                    <tr class="table-primary">
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <div class="row">
        <div class="col-lg">
            <table id="manufacturers" class="table table-hover" style="table-layout: auto;">
                <col width="90%">
                <col width="5%">
                <col width="5%">
                <thead>
                    <tr class="table-primary">
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="col-lg">
            <table id="models" class="table table-hover" style="table-layout: auto;">
                <col width="30%">
                <col width="30%">
                <col width="30%">
                <col width="5%">
                <col width="5%">
                <thead>
                    <tr class="table-primary">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Type</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
