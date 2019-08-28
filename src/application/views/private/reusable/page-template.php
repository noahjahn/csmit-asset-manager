<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
    <?php $this->load->view('require/head'); ?>
    <body>
        <div class="d-flex" id="wrapper">
            <?php $this->load->view('require/navbar'); ?>
            <div class="container-fluid mt-4 ml-3 mr-3">
                <?php
                $page['title'] = $title; $this->load->view('private/reusable/page-header', $page);
                if (isset($data)) {
                    $this->load->view($main_content, $data);
                } else {
                    $this->load->view($main_content);
                    log_message('debug', 'View: page-template: No data passed '.
                        'to the '.$page['title'].' page');
                }
                ?>
            </div>
        </div>

        <?php $this->load->view('private/reusable/confirmation-modal'); ?>
    </body>
</html>
