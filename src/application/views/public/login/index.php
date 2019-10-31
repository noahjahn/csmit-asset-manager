<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
    <?php
    $this->load->view('require/head');
    $this->load->view('public/login/header');
    ?>
    <body>
        <div class="row no-gutters h-100">
            <div class="col-lg align-self-center">
                    <!-- <div class="col text-center "> -->
                        <div class="login-form text-center">
                            <h4 class="mb-4">CSM Group IT Inventory</h4>
                            <?php echo form_open(current_url(), array( 'id' => 'login_form', 'name' => 'login_form', 'class' => 'h-100')); ?>
                                <fieldset>
                                    <div class="form-group mb-5">
                                        <input id="email" type="email" name="email" autocomplete="email" class="form-control login-input" placeholder="Email" value="<?php set_value('email'); ?>">
                                        <div class="text-danger"><?php echo form_error("email"); ?></div>
                                    </div>
                                    <div class="form-group mb-5">
                                        <input id="password" type="password" name="password" autocomplete="password" class="form-control login-input" placeholder="Password" value="<?php set_value('password'); ?>">
                                        <div class="text-danger"><?php echo form_error("password"); ?></div>
                                    </div>
                                    <div class="form-group mb-5">
                                        <input id="login-submit" type="submit" name="login-submit" value="Login" class="form-control btn-primary">
                                    </div>
                                    <div class="text-danger"><?php echo $this->session->flashdata('error'); ?></div>
                                </fieldset>
                            <?php echo form_close(); ?>
                        </div>
                    <!-- </div> -->
            </div>
            <div class="col-lg-8 vh-100 d-none d-lg-block d-xl-block">
                <img src="<?php echo $login_photo; ?>" alt="Login Photo" class="login-photo">
            </div>
        </div>
    </body>
</html>
