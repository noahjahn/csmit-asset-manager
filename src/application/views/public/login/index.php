<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
    <?php
    $this->load->view('require/head');
    $this->load->view('public/login/header');
    ?>
    <body>
        <div class="row">
            <div class="col-lg-4 align-self-center">
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-8 text-center">
                        <h4 class="mb-4">CSM Group IT Inventory</h4>
                        <?php echo form_open(current_url(), array( 'id' => 'login_form', 'name' => 'login_form')); ?>
                            <fieldset>
                                <div class="form-group mb-5">
                                    <input type="email" name="login_email" autocomplete="email" class="form-control login-input" placeholder="Email" value="<?php set_value('login_email'); ?>">
                                    <div class="text-danger"><?php echo form_error("login_email"); ?></div>
                                </div>
                                <div class="form-group mb-5">
                                    <input type="password" name="login_password" autocomplete="password" class="form-control login-input" placeholder="Password" value="<?php set_value('login_password'); ?>">
                                    <div class="text-danger"><?php echo form_error("login_password"); ?></div>
                                </div>
                                <div class="form-group mb-5">
                                    <input type="submit" name="login-submit" value="Login" class="form-control btn-primary">
                                </div>
                                <div class="text-danger"><?php echo $this->session->flashdata('error'); ?></div>
                            </fieldset>
                        <?php echo form_close(); ?>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
            </div>
            <div class="col-lg-8 vh-100">
                <img src="<?php echo $login_photo; ?>" alt="Login Photo" class="login-photo">
            </div>
        </div>
    </body>
</html>
