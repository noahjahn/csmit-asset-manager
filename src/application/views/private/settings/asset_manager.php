<div class="container-fluid container-style">
    <div class="row">
        <div class="col">
            <div class="container pt-2 mb-4">
                <div class="row mb-1">
                    <div class="col">
                        <h5 class="pt-3">Asset Types</h5>
                    </div>
                    <div class="col text-right">
                        <button type="button" class="btn btn-primary mr-0">Add Asset Type</button>
                    </div>
                </div>
                <div class="container inner-quarter-container">
                    <div class="table-scroll">
                        <table class="table table-hover">
                            <col width="65%">
                            <col width="25%">
                            <col width="5%">
                            <col width="5%">
                            <thead class="table-header">
                                <tr class="table-primary">
                                    <th>Name</th>
                                    <th>Rate</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                foreach($asset_types->result_array() as $asset_type) {
                                    echo '<tr class="table-row">';
                                    echo '<td>'.$asset_type['name'].'</td>';
                                    echo '<td>$'.$asset_type['rate'].'</td>';
                                    echo '<td><span class="table-icon"><img class="mini-icon" src="'.base_url().'assets/img/icons/edit-svgrepo-com-white.svg"><span></td>';
                                    echo '<td><img class="mini-icon" src="'.base_url().'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></td>';
                                    echo '</tr>';
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="container pt-2 mb-4">
                <div class="row mb-1">
                    <div class="col">
                        <h5 class="pt-3">Teams</h5>
                    </div>
                    <div class="col text-right">
                        <button type="button" class="btn btn-primary mr-0">Add Team</button>
                    </div>
                </div>
                <div class="container inner-quarter-container">
                    <div class="table-scroll">
                        <table class="table table-hover" style="table-layout: auto;">
                            <col width="90%">
                            <col width="5%">
                            <col width="5%">
                            <thead>
                                <tr class="table-primary">
                                    <th scope="col">Name</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                foreach($teams->result_array() as $team) {
                                    echo '<tr class="table-row">';
                                    echo '<td>'.$team['name'].'</td>';
                                    echo '<td><span class="table-icon"><img class="mini-icon" src="'.base_url().'assets/img/icons/edit-svgrepo-com-white.svg"><span></td>';
                                    echo '<td><img class="mini-icon" src="'.base_url().'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></td>';
                                    echo '</tr>';
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="container pt-2 mb-4">
                <div class="row mb-1">
                    <div class="col">
                        <h5 class="pt-3">Manufacturers</h5>
                    </div>
                    <div class="col text-right">
                        <button type="button" class="btn btn-primary mr-0">Add Manufacturer</button>
                    </div>
                </div>
                <div class="container inner-quarter-container">
                    <div class="table-scroll">
                        <table class="table table-hover" style="table-layout: auto;">
                            <col width="90%">
                            <col width="5%">
                            <col width="5%">
                            <thead>
                                <tr class="table-primary">
                                    <th scope="col">Name</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                foreach($manufacturers->result_array() as $manufacturer) {
                                    echo '<tr class="table-row">';
                                    echo '<td>'.$manufacturer['name'].'</td>';
                                    echo '<td><span class="table-icon"><img class="mini-icon" src="'.base_url().'assets/img/icons/edit-svgrepo-com-white.svg"><span></td>';
                                    echo '<td><img class="mini-icon" src="'.base_url().'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></td>';
                                    echo '</tr>';
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="container pt-2 mb-4">
                <div class="row mb-1">
                    <div class="col">
                        <h5 class="pt-3">Models</h5>
                    </div>
                    <div class="col text-right">
                        <button type="button" class="btn btn-primary mr-0">Add Model</button>
                    </div>
                </div>
                <div class="container inner-quarter-container">
                    <div class="table-scroll">
                        <table class="table table-hover" style="table-layout: auto;">
                            <col width="45%">
                            <col width="45%">
                            <col width="5%">
                            <col width="5%">
                            <thead>
                                <tr class="table-primary">
                                    <th scope="col">Name</th>
                                    <th scope="col">Manufacturer</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                foreach($models->result_array() as $model) {
                                    echo '<tr class="table-row">';
                                    echo '<td>'.$model['name'].'</td>';
                                    echo '<td>'.$model['manufacturer'].'</td>';
                                    echo '<td><span class="table-icon"><img class="mini-icon" src="'.base_url().'assets/img/icons/edit-svgrepo-com-white.svg"><span></td>';
                                    echo '<td><img class="mini-icon" src="'.base_url().'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></td>';
                                    echo '</tr>';
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
