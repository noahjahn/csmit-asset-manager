<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
    <?php $this->load->view('require/head'); ?>
    <body>
        <div class="row">
            <div class="col-lg-8 vh-100">
                <img src="<?php echo $login_photo; ?>" alt="Login Photo" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="col-lg-4 align-self-center">
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-8 text-left">

                    </div>
                    <div class="col-sm-2"></div>
                </div>
            </div>
        </div>
    </body>
</html>
