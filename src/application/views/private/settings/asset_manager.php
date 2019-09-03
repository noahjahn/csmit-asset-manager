<div class="container-fluid container-style">
    <div class="row">
        <div class="col">
            <table id="asset_types" class="table table-hover">
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
                        echo '<td><button class="table-icon" data-toggle="modal" data-target="#add_edit_asset_type_modal"><img class="mini-icon" src="'.base_url().'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                        echo '<td><button class="table-icon" data-toggle="modal" data-url="AssetTypes/delete/'.$asset_type['id'].'" data-title="Asset Type" data-target="#confirmation_modal"><img class="mini-icon" src="'.base_url().'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                        echo '</tr>';
                    }
                    ?>
                </tbody>
            </table>
        </div>
        <div class="col">
            <table id="teams" class="table table-hover" style="table-layout: auto;">
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
                        echo '<td><button class="table-icon" data-toggle="modal" data-url="teams/delete/'.$team['id'].'" data-title="Team" data-target="#confirmation_modal"><img class="mini-icon" src="'.base_url().'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                        echo '</tr>';
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <table id="manufacturers" class="table table-hover" style="table-layout: auto;">
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
                        echo '<td><button class="table-icon" data-toggle="modal" data-url="manufacturer/delete/'.$manufacturer['id'].'" data-title="Manufacturer" data-target="#confirmation_modal"><img class="mini-icon" src="'.base_url().'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                        echo '</tr>';
                    }
                    ?>
                </tbody>
            </table>
        </div>
        <div class="col">
            <table id="models" class="table table-hover" style="table-layout: auto;">
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
                        echo '<td><button class="table-icon" data-toggle="modal" data-target="#confirmation_modal"><img class="mini-icon" src="'.base_url().'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                        echo '</tr>';
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
