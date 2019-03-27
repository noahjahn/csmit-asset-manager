<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
    <?php $this->load->view('require/head'); ?>

    <body>
        <div class="d-flex" id="wrapper">
            <?php $this->load->view('require/navbar'); ?>
            <div id="page-content-wrapper">
                <div class="row">
                    <div class="col-md-10"></div>
                    <div class="col-md-2 text-right p-4">
                        <button type="button" class="btn btn-primary">Add Asset</button>
                    </div>
                </div>
                <table class="table table-hover" style="table-layout: auto;">
                    <thead>
                        <tr class="table-primary">
                            <th scope="col">Name</th>
                            <th scope="col">Manufacturer</th>
                            <th scope="col">Model</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Serial Number</th>
                            <th scope="col">Type</th>
                            <th scope="col">Asset Tag</th>
                            <th scope="col">Purchase Price</th>
                            <th scope="col">Purchase Date</th>
                            <th scope="col">Location</th>
                            <th scope="col">Team</th>
                            <th scope="col">Job Number</th>
                            <th scope="col">Rate</th>
                            <th scope="col">Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $assetCount = 0;
                        foreach($assets->result_array() as $asset) {
                            if ($assetCount % 2 == 0) {
                                echo '<tr>';
                            } else {
                                echo '<tr class="table-secondary">';
                            }

                            echo '<td>'.$asset['name'].'</td>';
                            echo '<td>'.$asset['manufacturer'].'</td>';
                            echo '<td>'.$asset['model'].'</td>';
                            echo '<td>'.$asset['owner'].'</td>';
                            echo '<td>'.$asset['serial_number'].'</td>';
                            echo '<td>'.$asset['type'].'</td>';
                            echo '<td>'.$asset['asset_tag'].'</td>';
                            echo '<td>'.'$'.$asset['purchase_price'].'</td>';
                            echo '<td>'.$asset['purchase_date'].'</td>';
                            echo '<td>'.$asset['location'].'</td>';
                            echo '<td>'.$asset['team'].'</td>';
                            echo '<td>'.$asset['job_number'].'</td>';
                            echo '<td>'.'$'.$asset['rate'].'</td>';
                            echo '<td>'.$asset['last_updated'].'</td>';

                            echo '</tr>';
                            $assetCount++;
                        }
                        ?>
                    </tbody>
                </table>
            </div>
            <!-- /#page-content-wrapper -->
        </div>
        <!-- /#wrapper -->
    </body>
</html>
