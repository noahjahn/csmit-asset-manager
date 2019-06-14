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
                    <div class="col-sm-8 text-left">
                        <h4>CSM Group Information Technology</h4>
                        <?php echo form_open(current_url(), array( 'id' => 'login_form', 'name' => 'login_form')); ?>
                            <fieldset>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" name="login_email" autocomplete="email" class="form-control" placeholder="email@example.com" value="<?php set_value('login_email'); ?>">
                                    <div class="text-danger"><?php echo form_error("login_email"); ?></div>
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" name="login_password" autocomplete="password" class="form-control" placeholder="********" value="<?php set_value('login_password'); ?>">
                                    <div class="text-danger"><?php echo form_error("login_password"); ?></div>
                                </div>
                                <!-- <div class="form-group">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" name="login_remember" id="login_remember" value="1">
                                        <label class="custom-control-label" for="login_remember">Remember me?</label>
                                    </div>
                                </div> -->
                                <div class="form-group">
                                    <input type="submit" name="login-submit" value="Login" class="form-control btn btn-primary">
                                </div>
                                <div class="text-danger"><?php echo $this->session->flashdata('error'); ?></div>
                            </fieldset>
                        <?php echo form_close(); ?>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
            </div>
            <div class="col-lg-8 vh-100">
                <img src="<?php echo $login_photo; ?>" alt="Login Photo" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
        </div>
    </body>
</html>
