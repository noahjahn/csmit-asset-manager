<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
    <?php $this->load->view('require/head'); ?>
    <body>
        <div class="d-flex" id="wrapper">
            <?php $this->load->view('require/navbar'); ?>
            <div class="container mt-5">
                <div class="row">
                    <div class="col">
                        <h1>Settings</h1>
                    </div>
                </div>
                <div class="container mt-5">
                    <div class="row">
                        <ul class="nav nav-tabs" style="width: 100%">
                            <li class="nav-item">
                                <a class="nav-link active" href="#">Asset Manager</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Users</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#">Permissions</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Login Photos</a>
                            </li>
                        </ul>
                        <div class="container container-style">
                            <div class="row">
                                <div class="col">
                                    <div class="container pt-2">
                                        <h4>Asset Types</h4>
                                        <div class="container inner-quarter-container-style">
                                            <table class="table table-hover" style="table-layout: auto;">
                                                <thead>
                                                    <tr class="table-primary">
                                                        <!-- <th scope="col">Name</th> -->
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Rate</th>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Computers</td>
                                                        <td>$100.00</td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <button>Add Asset Type</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="container pt-2">
                                        <h4>Teams</h4>
                                        <div class="container inner-quarter-container-style">
                                            <table class="table table-hover" style="table-layout: auto;">
                                                <thead>
                                                    <tr class="table-primary">
                                                        <!-- <th scope="col">Name</th> -->
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Rate</th>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Computers</td>
                                                        <td>$100.00</td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <button>Add Team</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="container pt-2">
                                        <h4>Manufacturers</h4>
                                        <div class="container inner-quarter-container-style">
                                            <table class="table table-hover" style="table-layout: auto;">
                                                <thead>
                                                    <tr class="table-primary">
                                                        <!-- <th scope="col">Name</th> -->
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Rate</th>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Computers</td>
                                                        <td>$100.00</td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <button>Add Manufacturer</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="container pt-2">
                                        <h4>Models</h4>
                                        <div class="container inner-quarter-container-style">
                                            <table class="table table-hover" style="table-layout: auto;">
                                                <thead>
                                                    <tr class="table-primary">
                                                        <!-- <th scope="col">Name</th> -->
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Rate</th>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Computers</td>
                                                        <td>$100.00</td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <button>Add Model</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
